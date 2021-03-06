import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    :root {
        box-sizing:border-box;
        margin:0;
        padding:0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        --bg-dark: #212529;
        --bg-light: #ced4da;
        --bg-dark-container: #495057;
        --bg-light-container: #f1f3f5;
        --size: 5px;
         @media screen and (min-width:700px) {
            font-size: 16px;
            --size: 8px
        }
        @media screen and (min-width: 1000px) {
            font-size: 18px;
            --size: 10px
        }
    }
    body {
        text-align:center
    }
    button[disabled] {
        color: grey!important;
    }
    body[data-theme='dark']{
        background: var(--bg-dark);
        color: var(--bg-light);
        form[class~='theme'] {
            background: #1b1a34;
            box-shadow: 5px 5px 25px #495057;
       
        }
        button[class~='basic'] {
            background: var(--bg-dark);
            color: var(--bg-light)       
        }
        button[class~='theme'] {
            width:40px;
            height:40px;  
            padding:5px;
            background: #d34b16;        
            box-shadow: 6px 6px 25px #212529;
            ::after {
                content: ' 🌞'
            }
         
        }

        a {
            color: var(--bg-dark);
         }
        a[class~='theme'] {
            color:var(--bg-dark);
            background: var(--bg-light);
        }
    }
    body[data-theme='light'] {
        background: var(--bg-light);
        color:var(--bg-dark);
        form[class~='theme'] {
            background: #9775fa;
            box-shadow: 5px 5px 25px #868e96;
        }
        button[class~='basic'] {
            background: var(--bg-light);
            color: var(--bg-dark)         
        }
        button[class~='theme'] { 
            width:40px;
            height:40px;           
            padding:5px;
            background: #0c1445;        
            box-shadow: 6px 6px 25px #868e96;
            ::after {
                content: '🌙'
            }
          
         }
         a{
             }
        a[class~='theme'] {
            color:var(--bg-light);
            background: var(--bg-dark);
        }
      
    }
    div [data-theme="light"] {
        background: #e9ecef;
        box-shadow: 6px 6px 25px #868e96;
    } 
    div [data-theme="dark"] {
        background: #495057;
        box-shadow: 6px 6px 25px #212529;
    }
`;

export default Global;
