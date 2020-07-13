import React from 'react';
import logo from '../../images/logo-white.svg'; 

const Logo = () => (
  <img src={logo} className="w-4/5" />
);

const Footer = () => (
  <footer class="bg-red-1000 p-6 mt-24">
    <div class="mx-auto container">
      <div class="w-full flex flex-col md:flex-row py-6">
        <div class="flex-1 mb-6">
          <a class="text-orange-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"  href="#"> 
          <Logo />
          </a>
        </div>
          <div class="flex-1">
              <p class="uppercase text-white md:mb-6">Links</p>
              <ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">FAQ</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">Help</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">Support</a>
                  </li>
              </ul>
          </div>
          <div class="flex-1">
              <p class="uppercase text-white md:mb-6">Legal</p>
              <ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">Terms</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">Privacy</a>
                  </li>
              </ul>
          </div>
          <div class="flex-1">
              <p class="uppercase text-white md:mb-6">Social</p>
              <ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">Facebook</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">Linkedin</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">Twitter</a>
                  </li>
              </ul>
          </div>
          <div class="flex-1">
              <p class="uppercase text-white md:mb-6">Company</p>
              <ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">Official Blog</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">About Us</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                      <a href="#" class="no-underline hover:underline text-white hover:text-orange-500">Contact</a>
                  </li>
              </ul>
          </div>
        </div>
      </div>
  </footer>
);

export default Footer;