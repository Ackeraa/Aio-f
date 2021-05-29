import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

import { AlertService } from '../../_services';

@Component({
	selector: 'app-alert',
	templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
	timer: any;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }
                this.message = message;
				this.timer = interval(5000).subscribe(() => this.alertService.clear());
				this.timer.unsubscribe();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
