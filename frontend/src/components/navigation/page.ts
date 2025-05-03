//import { ReactNode } from 'react';
import upload from '../../pages/upload';
import search from '../../pages/search';
import error from '../../pages/error';
interface route{
    name:string;
    url:string;
    path:string;
    order:number;
    show:boolean;
    index:boolean;
    page:any;
}
export const pageRoutes:Array<route>=[
   {
    name:"Upload",
    url:"/",
    path:"/",
    order:1,
    show:true,
    index:true,
    page:upload
   },
   {
    name:"Search",
    url:"/search",
    path:"/search",
    order:2,
    show:true,
    index:false,
    page:search
   },
   {
    name:"error",
    url:"/error",
    path:"*",
    order:0,
    show:false,
    index:false,
    page:error
   }
];


