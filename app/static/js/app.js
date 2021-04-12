/* Add your Application JavaScript */
// Instantiate our main Vue Instance//

const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron text-center">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

const UploadForm = {
    name: 'upload-form',
    template: 
    `
        <div class="form-container">
        
            <div class="msg-box">
                <div v-if="message[0] == 'success'">
                    <p class="btn btn-success">{{message[1]}}</p>
                </div>

                <div v-else>
                    <p v-for="message in message" class="btn btn-danger">{{message}}</p>
                </div>
            </div>

            <form id="uploadForm" @submit.prevent="uploadPhoto" enctype = "multipart/form-data">
                <div class="form-header">
                    <h1>Upload Form</h1>
                </div>

                <div class="form-group">
                    <label for="upPhoto" class="font-weight-bold">Upload photo</label>
                    <input type="file" class="form-control-file" id="upPhoto"/>
                </div>

                <div class="form-group">
                    <label class="font-weight-bold">Description:</label>
                    <textarea class="form-control" rows="5" id="des"></textarea>
                </div>

                <div class="form-group">
                    <button class='btn btn-primary' type="submit">Submit</button>
                </div>
            </form>
        </div>
    `,
    data() {
        return {
            message: " ",  
        }    
    },
    methods:
    {
        uploadPhoto()
        {
            let self = this;
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);

            fetch("/api/upload",{
                method: 'POST',
                body: form_data,
                headers: {'X-CSRFToken': token},
                credentials: 'same-origin'
            })
                .then(function(response){
                    return response.json();
                })

                .then(function(jsonResponse){
                    //display a success message
                    console.log(jsonResponse.errors);
                    if(jsonResponse.errors){
                        self.message = null
                        self.message = jsonResponse.errors
                        uploadForm.reset();
                    }
                    else if(jsonResponse.message){
                        self.message = null
                        self.message = ["success",jsonResponse.message]
                    }
                })
                .catch(function(error){
                    console.log(error);
                });
        }
    }
};

const app = Vue.createApp({
    data() {
        return {
             welcome: 'Hello World! Welcome to Lab7 with VueJS'
        }
    },
    components: {
        'home': Home,
        'upload': UploadForm
    }
});


app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/upload" class="nav-link">Upload Photo</router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container text-center">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

// Define Routes
const routes = 
[
    { path: "/", component: Home },
    // Put other routes here
    {path: '/upload', component: UploadForm},

    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
        
});

app.use(router);

app.mount('#app');