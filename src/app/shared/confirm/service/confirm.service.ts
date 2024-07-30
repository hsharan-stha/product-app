import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import {ConfirmComponent} from "../confirm.component";
import {Observable, Subject, take} from "rxjs";
import {ConfigDialogBoxConfig} from "../interface/ConfirmInterface";

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private componentRef!:ComponentRef<any>;

  private processConfirmation=new Subject();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector
  ) { }


  public show(modalObj: ConfigDialogBoxConfig) {
    this.drop();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmComponent);
    this.componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(this.componentRef.hostView);

    const instance: any = this.componentRef.instance;

    instance.headerTitle = modalObj.headerTitle;
    instance.bodyMessage = modalObj.bodyMessage ? modalObj.bodyMessage : 'Are You Sure';
    instance.bodyTitle = modalObj.bodyTitle ? modalObj.bodyTitle : 'Ready to save';

    this.componentRef.instance.cancelBtn.pipe(take(1)).subscribe((data: object | boolean) => {
      this.setProcessConfirmation(data);
      this.drop();
    });

    this.componentRef.instance.confirmBtn.pipe(take(1)).subscribe((data: object | boolean) => {
      this.setProcessConfirmation(data);
      this.drop();
    });

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  public getProcessConfirmation(): Observable<any> {
    return this.processConfirmation.asObservable();
  }

  private setProcessConfirmation(val: any) {
    this.processConfirmation.next(val);
  }

  private drop() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }

}
