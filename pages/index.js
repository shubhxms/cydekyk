import React, {useState, useEffect} from "react";
import HeadComponent from '../components/Head';
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Product from "../components/Product";
import CreateProduct from "../components/CreateProduct";


// Constants
const TWITTER_HANDLE = "shubhxms";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const [creating, setCreating] = useState(false);


  useEffect(() => {
    if(publicKey){
      fetch('/api/fetchProducts')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        console.log(data)
      })

    }
  }, [publicKey])
  

  const renderNotConnectedContainer = () => (
      <div>
        <img src="https://media2.giphy.com/media/HcmeBxVSg8YGA/giphy.gif?cid=ecf05e47zm70dth7hjfwytu77eh8bmpz7rdb5t2mq51lw73o&rid=giphy.gif&ct=g" alt="emoji" />
        {console.log("here")}
        <div className="button-container">
          <WalletMultiButton className="cta-button connect-wallet-button" />
        </div>    
      </div>
    );

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  
  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header">cyde-kyk✨🏪</p>
          {/* <p className="sub-text">store</p> */}
          {isOwner && (
            <button className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close" : "Create Product"}
            </button>
          )}
        </header>

        <main>
          {/* <img src="https://media2.giphy.com/media/HcmeBxVSg8YGA/giphy.gif?cid=ecf05e47zm70dth7hjfwytu77eh8bmpz7rdb5t2mq51lw73o&rid=giphy.gif&ct=g" alt="emoji" /> */}
          {creating && <CreateProduct/>}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
