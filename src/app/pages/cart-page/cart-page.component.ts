import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddToCart } from 'src/app/interface/addToCart';
import { Cart } from 'src/app/interface/cart';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  myCart:Cart;
  addToCart:AddToCart;


  constructor(private router: Router, private authService: AuthenticationService,
    private cartService:CartService) { }

  ngOnInit(): void {

    this.getMyCart();

}

  getMyCart(){
    this.cartService.getMyCart().subscribe(
      (response:any)=>{
        this.myCart=response;
      }
    )
  }



  updateformInfo(id:number,productId:number,quantity:String){  
    this.addToCart=new AddToCart();     
    this.addToCart.id=id;   
    this.addToCart.quantity=Number(quantity);   
    this.addToCart.productId=productId;
    this.save(this.addToCart,id);
  }  
  
  save(cartItem:object,id) {  
    this.cartService.updateCartItem(cartItem,id).subscribe(
      data => console.log(data),
       error => {},
       () => this.getMyCart());  
  }  


  DeleteCartItemById(id : number) {
    this.cartService.deleteCartItem(id)
      .subscribe(()=>this.getMyCart())
  }


  doLogout() {
		this.authService.logout();
		this.router.navigateByUrl('/login');
	}

}
