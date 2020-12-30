

import { faShopify, faWordpress, faMagento } from "@fortawesome/free-brands-svg-icons";
import {faPalette, faCode} from "@fortawesome/free-solid-svg-icons"

const SiteData = [
  {
    name: 'services',
    datas: [
      {
        name: 'Magento Development',
        image: '',
        icon: faMagento,
        description:
          'We are Magento Experts with a talented team of certified Magento 2 Developers. We are official Magento 2 trained professionals and experienced at delivering exceptional Magento stores.',
      },
      {
        name: 'Web Development',
        image: '',
        icon: faCode,
        description: 'Your website is your most important marketing tool, and our team is with you every step of the way to ensure we develop a custom website that you and your audience will love.',
      },
      {
        name: 'Magento Support',
        image: '',
        icon: faMagento,
        description:
          'Your Magento store requires ongoing maintenance to protect it from security vulnerabilities and to constantly improve the user experience and site performance to stay one step ahead of your competitors.',
      },
      {
        name: 'Graphic Design',
        image: '',
        icon: faPalette,
        description: 'Your Magento store requires ongoing maintenance to protect it from security vulnerabilities and to constantly improve the user experience and site performance to stay one step ahead of your competitors.',
      },
      {
        name: 'WordPress',
        image: '',
        icon: faWordpress,
        description: 'Your Magento store requires ongoing maintenance to protect it from security vulnerabilities and to constantly improve the user experience and site performance to stay one step ahead of your competitors.',
      },
      {
        name: 'Shopify',
        image: '',
        icon: faShopify,
        description:
          'We are Shopify Plus Experts with a talented team of Shopify Plus Designers and Developers. We are official Shopify Plus Partners and experienced at delivering exceptional Shopify Plus stores.',
      },
    ],
  },{
      name:'steps',
      datas:[{
          name:'DISCOVERY',
          description:'The first phase is the meeting of the minds. Here’s where we get to know your vision, find out how it aligns to our skills and experience, and truly do our homework as we go about our full stack development process. Our founders oversee every step for quality control.'
      },
      {
        name:'ESTIMATE',
        description:'We kick off each project with an upfront agreement on cost and timing. We’ll offer a plan for full stack design that will be truly worth the investment, providing specific details about what you can hold us accountable for at each phase.'
    },
    {
        name:'ARCHITECT',
        description:'Our principal skillset as a full stack development company resides here. Our team gets to work, using only in-house developers, applying the right tools and strategies to make your project a success. And our online project management portal provides transparency throughout the process.'
    },{
     name:'BUILD',
description:'Here’s where our architects and developers bring your vision to reality. We loop in your team, give them the reigns, get real-time feedback and adjust, making sure you get the most from your new custom applications.'
    },
  {
    name:'LAUNCH',
    description:'We’ll be right beside you as you bring your solution into the world. This is where you and your customers will tuly reap the benefits of working with a full stack development company. And as your company grows, we can help you make updates to keep things running at peak efficiency.'
  }]
  },
];

export default { SiteData };
