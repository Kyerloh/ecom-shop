<template>
  <div class="products  p-5">
      <div class="container p-5">
          
        <div class="intro h-100  p-5">
            <div class="row h-100 align-items-center">
              <div class="col-md-6 ml-3">
                    <h3>Profile settings</h3>
                    
                 <p>
                   Change your profile settings here
                 </p>
              </div>
              <div class="col-md-5">
                  <img src="/img/svg/profile.svg" width="300" alt="" class="img-fluid">
              </div>
            </div>
          </div>
          <div class="profile-content">
          <ul class="nav nav-pills ml-3" id="myTab" role="tablist">

            <li class="nav-item">
              <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
            </li>

            <li class="nav-item">
              <a class="nav-link"  id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Account settings</a>
            </li>
           
          </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                  <div class="container">
                      <div class="row">
                        
                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" v-model="profile.name" placeholder="Full name" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="profile.phone" placeholder="Phone" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="text" v-model="profile.addreess"  placeholder="Address" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-8">
                          <div class="form-group">
                            <input type="text" v-model="profile.postCode" placeholder="Postcode" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="submit" @click="updateProfile" value="Save Changes" class="btn btn-primary w-100">
                          </div>
                        </div>

                      </div>
                  </div>
                
                </div>

                <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
                  <div class="container">
                      <div class="row">
                        <div class="col-md-">
                            <div class="alert alert-info">
                              Please use the Reset password email button for reseting the password. The form doens't work currently
                            </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" v-model="account.name"  placeholder="User name" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" v-model="account.email"   placeholder="Email address" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" v-model="account.password"  placeholder="New password" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" v-model="account.confirmPassword"  placeholder="Confirm password" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="file" @change="uploadImage" class="form-control">
                           </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="submit" value="Save Changes" class="btn btn-primary w-100">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="button" @click="resetPassword" value="Reset password email" class="btn btn-success w-100">
                          </div>
                        </div>
                      </div>
                  </div>
                </div>

            </div>
            
          </div>

      </div>

    
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db} from '../firebase';

export default {
  name: "profile",
  components: {
    VueEditor
  },
  props: {
    msg: String
  },

  data(){
    return {
      profile:{
        name:'',
        phone:'',
        address:'',
        postCode:''
      },
      account:{
        name:'',
        email:'',
        photoUrl:'',
        emailVerified:'',
        password:'',
        confirmPassword:'',
        uid:''
      }
    }       
  },
  firestore(){
      //fetch user
      const user = fb.auth().currentUser;
    return{
      // Collection
      profile: db.collection('profiles').doc(user.uid)
    }
  },
  methods:{
    resetPassword(){
      const auth = fb.auth();
      auth.sendPasswordResetEmail(auth.currentUser.email).then(() =>{
         Toast.fire({
                icon: 'success',
                title: 'A link has Been Sent to Your Email Address'
            })
      }).catch((error) =>{
        console.log('Error');
      });

    },
    updateProfile(){
          this.$firestore.profile.update(this.profile);
    },
    uploadImage(){}
  },
  created(){
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
