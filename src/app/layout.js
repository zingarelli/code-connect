import { Prompt } from 'next/font/google';
import { Aside } from '@/components/Aside';
import './globals.css';
import Searchbar from '@/components/Searchbar';

export const metadata = {
  title: "Code Connect",
  description: "Uma rede social para devs!",
};

const prompt = Prompt({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={prompt.className}>
      <body>
        <div className='app-container'>
          <Aside />
          <div>
            <Searchbar />
            {children}            
          </div>
        </div>
      </body>
    </html>
  );
}
