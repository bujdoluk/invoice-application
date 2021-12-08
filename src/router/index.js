import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import InvoiceView from '../views/InvoiceView.vue'
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";

// route guard
import { projectAuth } from '../firebase/config';

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

// requireAuth temporarily disabled

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "Log In",
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      title: "Sign Up",
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    //beforeEnter: requireAuth,
    meta: {
      title: "Home",
      requireAuth: false
    }
  },
  {
    path: '/invoice/:invoiceId',
    name: 'Invoice',
    component: InvoiceView,
    //beforeEnter: requireAuth,
    meta: {
      title: "Invoice",
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router
