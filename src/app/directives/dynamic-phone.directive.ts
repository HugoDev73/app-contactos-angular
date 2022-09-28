import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicPhone]'
})
export class DynamicPhoneDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
