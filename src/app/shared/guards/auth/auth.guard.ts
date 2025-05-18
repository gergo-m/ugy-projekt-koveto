import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }

      console.log("Access denied - Not logged in");
      router.navigate(["/login"]);
      return false;
    })
  );
};


export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (!user) {
        return true;
      }

      console.log("Already logged in, redirecting to dashboard");
      router.navigate(["/dashboard"]);
      return false;
    })
  );
};