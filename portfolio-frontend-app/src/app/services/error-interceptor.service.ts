import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { PoNotificationService } from '@po-ui/ng-components'
import { AuthService } from './auth.service'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private poNotificationService: PoNotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.authService.signOut()
            break
          case 500:
            this.poNotificationService.error({
              message: 'Something went wrong!',
              duration: environment.poNotificationDuration
            })
            break
          default:
            if (error?.error?.message) {
              this.poNotificationService.warning({
                message: error.error.message,
                duration: environment.poNotificationDuration
              })
            }
            if (error?.error?.data?.message) {
              this.poNotificationService.warning({
                message: error.error.data?.message,
                duration: environment.poNotificationDuration
              })
            }
        }
        
        return throwError(() => error.error)
      })
    )
  }
}
