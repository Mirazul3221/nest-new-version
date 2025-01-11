import banner01 from '@/public/banner/banner01.jpg'
import banner02 from '@/public/banner/banner02.jpg'
import banner03 from '@/public/banner/banner03.jpg'
import banner04 from '@/public/banner/banner04.jpg'
import mobile01 from "@/public/banner/mobile01.png"
import mobile02 from "@/public/banner/mobile02.png"
import { BsEmojiGrin } from "react-icons/bs";
import { LuScrollText } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { TbFileDatabase } from "react-icons/tb";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineCreate } from "react-icons/md";

export const projectsData = [
    {
        id: 1,
        name: 'AI Powered Financial App',
        description: "Me and my team built an AI-powered financial mobile application. I have developed API using Express, Typescript, OpenAI, AWS, and MongoDB. Used OTP via AWS SES, Google, and Facebook for the authentication system. Built AI assistants using OpenAI's latest model and trained using our dataset. Voice messages are converted to text using AWS Transcribe. The app fetches data from Google Sheets and generates a PDF term sheet, sent via AWS SES.",
        tools: ['Express', 'MongoDB', 'OpenAI API', 'AWS SES', 'AWS S3', 'Node Mailer', 'Joi', 'Puppeteer', 'EC2', 'PM2', 'Nginx'],
        role: 'Backend Developer',
        code: '',
        demo: '',
        image: banner01,
        mobile:mobile01
    },
    {
        id: 2,
        name: 'Travel Agency App',
        description: 'I have designed and developed a full-stack web app for 2Expedition, a travel agency in Armenia. I created the UI using NextJS, Typescript, MUI, TailwindCSS, Google Maps, Sun-Editor, and React Slick. The app supports multiple languages and currencies. I developed the API using NestJS, Typescript, MySQL, TypeORM, AWS, and Nodemailer. I deployed the front-end app to AWS Amplify and the back-end app to AWS EC2.',
        tools: ['NextJS', 'Tailwind CSS', "Google Maps", "NestJS", "TypeScript", "MySQL", "AWS S3", "Sun-Editor", "Gmail Passkey"],
        role: 'Full Stack Developer',
        code: '',
        demo: '',
        image: banner02,
        mobile:mobile02
    },
    {
        id: 3,
        name: 'AI Powered Real Estate',
        description: 'My team built an AI-based real estate app using Replicate API and OpenAI. We used Express, Typescript, OpenAI, Replicate, Stripe, and Mongoose to develop the API. We utilized NextJS, Formik, TailwindCSS, and other npm libraries for the UI. We have trained multiple AI assistants using the latest GPT model and integrated Replicate API for image processing. We added role-based auth, subscription plans, Cron job scheduling, and payment integration with Stripe.',
        tools: ['React', 'Bootstrap', 'SCSS', 'Stripe', 'Express', 'TypeScript', 'MongoDB', 'Azure Blob', 'OpenAI API', 'Replicate AI', 'Cronjob', 'JWT'],
        code: '',
        role: 'Full Stack Developer',
        demo: '',
        image: banner03,
    },
    {
        id: 4,
        name: 'Newsroom Management',
        description: "My team and I developed a newspaper management dashboard application called Newsroom Management. As a front-end developer, I worked on creating the dashboard using NextJS, Material UI, Redux, Calendar, and other necessary npm libraries. We used React Redux to manage the application's state and React-hook-form and Sun Editor to handle forms.",
        tools: ['NextJS', 'Material UI', 'Redux', 'Sun Editor', "Calendar"],
        code: '',
        demo: '',
        image: banner04,
        role: 'Full Stack Developer',
    }
];

export const section2_data = [
    { emoji:<BsEmojiGrin size={50}/>,
        title:'সহজ প্রক্রিয়া',
        description:'অতি অল্প সময় একজন শিক্ষার্থী  এখানে একাউন্ট খুলে অন্যান্য শিক্ষার্থীদের সাথে স্টাডি আরাম্ভ করতে পারবে। একজন ব্যবিহারকারীর একটি একাউন্ট সফলভাবে চালু করতে...'
    },
    {
        emoji:<LuScrollText size={50}/>,
        title:'সোশ্যাল মিডিয়া প্ল্যাটফর্মের মতো অধ্যয়ন',
        description:'একটুখানি স্ক্রোল করলেই ভেসে উঠবে আপনার বন্ধুদের শেয়ার করা সকল প্রশ্ন এবং প্রশ্ন সংক্রান্ত সকল উত্তর। যা আপনি এম,সি,কিউ আকারে দেখতে পাবেন।ফেসবুকে স্ক্রোল করলে আমরা যেমন সকলের পোস্ট দেখতে পাই তেমনি এখানে স্ক্রোল করলে বন্ধুদের পোস্ট করা এম,সি,কিউ টাইপের প্রশ্ন ও উত্তর দেখতে পাব। আরো জানতে নিচের রিড মোর বাটনে চাপ দিন'
    },
    { emoji:<CiViewList size={50}/>,
        title:'বিষয়ভিত্তিক অধ্যয়ন',
        description:'আমাদের এপ্লিকেশনে দুইটি বিশেষ ধাপে এম,সি,কিউ প্রশ্ন সংরক্ষিত থাকবে। প্রথমটি হলো এই এপ্লিকেশনটির স্বয়ংক্রিয় প্রশ্নসমূহ, যা বিষয় ভিত্তিক আকারে সাজানো থাকবে অন্যটি হলো আপনার বন্ধুদের থেকে শেয়ার করা প্রশ্ন সমূহ। বর্তমানে আমাদের অ্যাপ স্টোরে কোন প্রশ্ন না থাকলেও পরবর্তী আপডেটে একটি জব সলুশন পুস্তাকে যত সমাধান থাকে ব্যাখ্যা সহ সবকিছু আমাদের সার্ভারে প্রবেশ করানো হবে।'
    },
    { emoji:<TbFileDatabase size={50}/>,
        title:'প্রশ্ন সংরক্ষণ করে পরে পড়ার সুবিধা',
        description:'এই এপ্লিকেশনপর অন্য একটি গুরুত্বপূর্ন বৈশিষ্ট্য হলো আপনি আপনার পছন্দের প্রশ্নসমূহ সংরক্ষন করে রাখতে পারবেন। যে প্রশ্নসমূহ একবার সংরক্ষন করা হবে সেটি আমাদের সার্ভারে দীর্ঘ সময়ের জন্য সেভ হয়ে থাকবে। তাই একজন ব্যবহারকারী আনেক দিন অনুপস্থিত থেকেও পুনরায় সাইন ইন হয়ে পুনরায় পূর্বের সংরক্ষিত সব প্রশ্নসমূহ সহজে খুঁজে বের করতে পারবে'
    },
    { emoji:<AiOutlineMessage size={50}/>,
        title:'সোশ্যাল মিডিয়া প্ল্যাটফর্মের মতো সহজ যোগাযোগ',
        description:'এই প্লাটফর্মের আরও একটি বৈশিষ্ট্য হলো আপনি অন্যান্য সামাজিক প্লাটফর্মের মত আপনার পছন্দের মানুষের সাথে যোগাযোগ করতে পারবেন। কথোপকথোনের জন্য একটি সক্রিয় চ্যাট অ্যাপলিকেশন আছে যেখানে ভিডিও কলে সরাসরি ফেস টু ফেস কথা বলতে পারবেন।'
    },
    { emoji:<MdOutlineCreate size={50}/>,
        title:'নিজের মতামত ব্যবহার করে এমসিকিউ (Multiple Choice Question) তৈরির সুবিধাগুলো',
        description:'নিজের মতামতের উপর ভিত্তি করে আপনি প্রশ্ন তৈরি করতে পারবেন এবং সংরক্ষন করে রাখতে পারবেন। এমনকি আপনার প্রশ্ন আপনার অন্য বন্ধুরা পড়ে উপকৃত হতে পারে। একটি মানসম্মত প্রশ্ন অন্য বন্ধুদের আকর্ষণ করতে পারে এবং আপনি প্রচুর লাইক পেতে পারেন যা আপনাকে আরও প্রশ্ন তৈরি করতে সাহায্য করতে পারে।'
    },
]


// `প্রশ্ন সংরক্ষণ করে পরে পড়ার সুবিধা":

// সময় সাশ্রয়: গুরুত্বপূর্ণ প্রশ্নগুলো সংরক্ষণ করে রাখলে পরে সহজে পুনরায় দেখতে পারেন, বারবার খোঁজার প্রয়োজন হয় না।
// ফোকাসড লার্নিং: সংরক্ষিত প্রশ্নগুলো থেকে প্রাসঙ্গিক বিষয়গুলোতে মনোযোগ দেওয়া সহজ হয়।
// রিভিশন সহজ করা: পরে পড়ার জন্য প্রশ্ন সংরক্ষণ করলে রিভিশনের সময় সেগুলো কাজে আসে।
// গভীর বিশ্লেষণ: জটিল প্রশ্নগুলো সংরক্ষণ করে পরে সময় নিয়ে বিশ্লেষণ করতে পারেন।
// লং-টার্ম রেফারেন্স: ভবিষ্যতে কোনো নির্দিষ্ট বিষয়ের উপর পুনরায় পড়তে হলে এগুলো রেফারেন্স হিসেবে কাজে লাগে।
// এটি বিশেষত শিক্ষার্থীদের জন্য কার্যকরী, যারা স্ট্রাকচার্ড এবং পরিকল্পিতভাবে পড়াশোনা করতে চান।`