import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';

// ── EmailJS credentials ────────────────────────────────────────────────────
// 1. Sign up at https://emailjs.com
// 2. Add a Gmail service  → copy the Service ID here
// 3. Create an email template (use variables: from_name, from_email, subject, message)
//    → copy the Template ID here
// 4. Account → API Keys → copy the Public Key here
const EJS_SERVICE_ID  = 'service_sa2bxgl';
const EJS_TEMPLATE_ID = 'template_g9ktscs';
const EJS_PUBLIC_KEY  = 'z6e9jxpGSzwMIsIc_';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit, OnDestroy {
  @ViewChild('infoRef') infoRef!: ElementRef;
  @ViewChild('formRef') formRef!: ElementRef;

  contactForm: FormGroup;
  submitted  = false;
  loading    = false;
  errorMsg   = '';

  nameFocused    = false;
  emailFocused   = false;
  subjectFocused = false;
  messageFocused = false;

  // Terminal typing state
  typedText = '';
  private readonly promptLines = [
    '> Initialising contact module...',
    '> Connection established.',
    '> Ready to receive your message.',
  ];
  private typeIdx  = 0;
  private charIdx  = 0;
  private typeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {
    this.contactForm = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.fromTo(this.infoRef.nativeElement,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.05 },
      );
      gsap.fromTo(this.formRef.nativeElement,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 },
      );
    });

    // Start terminal typewriter after slight delay
    this.typeTimer = setTimeout(() => this.typeNext(), 600);
  }

  // ── Terminal typewriter ────────────────────────────────────────────────────
  private typeNext(): void {
    if (this.typeIdx >= this.promptLines.length) return;

    const line = this.promptLines[this.typeIdx];
    if (this.charIdx < line.length) {
      this.typedText += line[this.charIdx];
      this.charIdx++;
      this.cdr.detectChanges();
      this.typeTimer = setTimeout(() => this.typeNext(), 28);
    } else {
      // Line done — pause then start next line
      this.typedText += '\n';
      this.typeIdx++;
      this.charIdx = 0;
      this.cdr.detectChanges();
      if (this.typeIdx < this.promptLines.length) {
        this.typeTimer = setTimeout(() => this.typeNext(), 400);
      }
    }
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading  = true;
    this.errorMsg = '';

    const { name, email, subject, message } = this.contactForm.value;

    emailjs.init(EJS_PUBLIC_KEY);

    emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, {
      from_name:  name,
      from_email: email,
      subject:    subject,
      message:    message,
      reply_to:   email,
    })
    .then(() => {
      this.loading   = false;
      this.submitted = true;
      this.contactForm.reset();
      this.cdr.detectChanges();
    })
    .catch((err: unknown) => {
      this.loading  = false;
      this.errorMsg = 'Failed to send. Please email me directly at mu501362@gmail.com';
      console.error('EmailJS error:', err);
      this.cdr.detectChanges();
    });
  }

  resetForm(): void {
    this.submitted = false;
    this.errorMsg  = '';
  }

  ngOnDestroy(): void {
    if (this.typeTimer) clearTimeout(this.typeTimer);
  }
}
