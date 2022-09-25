import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicEmail]'
})
export class DynamicEmailDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
