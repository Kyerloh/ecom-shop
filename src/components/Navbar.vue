<template>
  <div class="hello">
    <nav class="navbar custom-nav fixed-top navbar-expand-lg navbar-light bg-light">
          <div class="container">
              <router-link class="navbar-brand" to="/">Ecom Shop</router-link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" >Products</a>
                  </li>
                  <li class="nav-item">
                    <router-link to="/checkout" class="nav-link" >Checkout</router-link>
                  </li>                  
                  <li class="nav-item">
                    <router-link to="/about" class="nav-link">About</router-link>
                  </li>
                
                </ul>
                <form class="form-inline my-2 my-lg-0">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                  <a class="btn btn-outline-success my-4 mx-3 my-sm-0" data-toggle="modal" data-target="#login">Get Started</a>
                  <a class="btn btn-outline-info my-2 my-sm-0" data-toggle="modal" data-target="#miniCart"><i class="fas fa-cart-plus"></i></a>
                </form>
              </div>
          </div>
      </nav>  
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  components:{

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @media (min-width: 992px) { 
    
    .navbar.custom-nav{
      padding-top:16px;
      padding-bottom:16px;
      background-color: #fff !important;
    }

   }

</style>
