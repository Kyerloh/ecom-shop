<template>
  <div class="products">
      <div class="container p-5">
            <div class="intro">
                <div class="row">
                    <div class="col-md-6">
                        <h3>Product Page</h3>
                        <p>Checkout The Nice Stuff</p>
                    </div>
                    <div class="col-md-6">
                        <img src="/img/svg/products.svg" alt="" class="img-fluid">
                    </div>
                </div>
            </div>
            <hr>
            <div class="product-test">
                <h3 class="d-inline">Products List</h3>
                  <button @click="addNew" class="btn btn-primary float-right">Add Product</button>
                <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Modify</th>
                      </thead>
                      <tbody>
                        <tr v-for="product in products" :key="product.id">
                          <td>{{product.product_name}}</td>
                          <td>{{product.image}}</td>
                          <td>{{product.price}}</td>
                          <td>
                            <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
                            <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
      <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editTitle">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" v-model="product.product_name" placeholder="Product Name" class="form-control">
                    </div>

                    <div class="form-group">
                        <vue-editor v-model="product.description"></vue-editor>
                    </div>
                  </div>  
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>
                    <div class="form-group">
                      <input type="text" v-model="product.price" placeholder="Product price" class="form-control">
                    </div>
                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" v-model="tag" placeholder="Product tags" class="form-control">
                        <div  class="d-flex">
                          <p v-for="tag in product.tags" :key="tag.id">
                              <span class="p-1">{{tag}}</span>
                          </p>
                        </div>
                    </div>
                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file"  @change="uploadImage" class="form-control">
                    </div>
                    <div class="form-group d-flex">
                        <div class="p-1" v-for="(image, index) in product.images" :key="image.id">
                            <div class="img-wrapp">
                                <img :src="image" alt="" width="80px">
                                <span class="delete-img" @click="deleteImage(image,index)">X</span>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>
  </div>      
</template>

<script>
// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor";
import {fb,db} from '../firebase.js'
export default {
    name: "Products",
    components: {
      VueEditor
    },
    data(){
      return{
        products:[],
        product:{
          product_name:'',
          description:'',
          price:'',
          tags:[], 
          images:[] 
        },
        activeItem:null,
        modal:null,
        tag:null
      }
    },
    firestore(){
      return {
        // Collection
        products: db.collection('products'),

      }
    },
    methods:{
      deleteImage(img,index){
        let image = fb.storage().refFromURL(img);
        this.product.images.splice(index,1);
        image.delete().then(function() {
          console.log('image deleted');
        }).catch(function(error) {
          // Uh-oh, an error occurred!
          console.log('an error occurred');
        });

      },
      addTag(){
        this.product.tags.push(this.tag);
        this.tag = "";
      },
      uploadImage(e){
        if (e.target.files[0]) {
            let file = e.target.files[0];
            // Create a root reference
            var storageRef = fb.storage().ref('products/'+ Math.random() + '_' + file.name);
            let uploadTask = storageRef.put(file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', (snapshot)=>{
              //the code for state change should be here
            }, (error)=> {
              // Handle unsuccessful uploads
            }, () =>{
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
                this.product.images.push(downloadURL);
                //console.log('File available at', downloadURL);
              });
            }); 
        }
        //console.log(e.target.files[0])
      },
      reset(){
        this.product={
          product_name:'',
          description:'',
          price:'',
          tags:[], 
          images:[] 
        }
      },
      addNew(){
        this.modal = 'new';
        this.reset();
        $('#product').modal('show');
      },
      updateProduct(){
        this.$firestore.products.doc(this.product.id).update(this.product);
          Toast.fire({
                icon: 'success',
                title: 'Product Updated successfully'
            })
        $('#product').modal('hide');
      },
      editProduct(product){
          this.modal = 'edit';
          this.product = product;
          $('#product').modal('show');
      },
      deleteProduct(doc){
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              this.$firestore.products.doc(doc.id).delete()
              Toast.fire({
                icon: 'success',
                title: 'Product Deleted successfully'
              })
            }
          })
      },
      readData(){

      },
      addProduct(){
         this.$firestore.products.add(this.product);
             Toast.fire({
                icon: 'success',
                title: 'Product Added successfully'
            })
        $('#product').modal('hide');
      }
    },
    created(){
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .products{
    text-align: justify;
    margin-left: 50px;
  }
  .img-wrapp{
    position: relative;
  }
  .img-wrapp span.delete-img{
      position: absolute;
      top: -14px;
      left: -2px;
  }
  .img-wrapp span.delete-img:hover{
    cursor: pointer;
  }
</style>
