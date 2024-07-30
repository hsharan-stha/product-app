import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import {ToastComponent} from "../toast.component";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private componentRef!:ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector
  ) { }


  public show(message: String) {
    this.drop();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ToastComponent);
    this.componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(this.componentRef.hostView);

    const instance: any = this.componentRef.instance;

    instance.message = message;

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    setTimeout(()=>{
      this.drop();
    },5000)
  }


  private drop() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }
}
