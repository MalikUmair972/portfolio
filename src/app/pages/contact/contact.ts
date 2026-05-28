import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';

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
  submitted = false;
  loading   = false;

  nameFocused    = false;
  emailFocused   = false;
  subjectFocused = false;
  messageFocused = false;

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
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
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.05 },
      );
      gsap.fromTo(this.formRef.nativeElement,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.15 },
      );
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.loading   = false;
      this.submitted = true;
      this.contactForm.reset();
    }, 1800);
  }

  resetForm(): void {
    this.submitted = false;
  }

  ngOnDestroy(): void {}
}
