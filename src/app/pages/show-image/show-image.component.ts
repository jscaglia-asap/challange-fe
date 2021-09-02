import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';
import { BaseService } from 'src/app/components/base/services/base.service';
import { ShowImageService } from './services/show-image.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent extends BaseComponent implements OnInit {
  public imageBase64: string = "";

  constructor(
    public baseService: BaseService,
    public router: Router,
    private showImageService: ShowImageService,
    public snackBar: MatSnackBar) {
    super(baseService, router, snackBar);
  }

  ngOnInit(): void {
    this.getImage();
  }

  public logOut(): void {
    this.baseService.logOut();
    this.router.navigate(['']);
  }

  private getImage(): void {
    const imageId = this.baseService.getImageId();
    this.showImageService.getImage(imageId).subscribe((image: any) => {
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        if (reader.result) {
          this.imageBase64 = reader.result.toString();
        }
      }
    }, (error: Error) => {
      this.snackBar.open(error.message, undefined, {
        duration: 5000,
      });
      console.error(error.message);
    })
  }
}
