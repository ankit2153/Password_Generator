import { useState,useCallback,useEffect,useRef} from 'react'


import './App.css'

function App() {

  
  
  const [length,setLength] = useState(8);

  const [number,setNumber] = useState(false);

  const [char,setChar] = useState(false);

  const [password,setPassword] = useState("");

  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(()=>{

    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(number) str+="0123456789";
    if(char) str+="~!@#$%^&*(){}[]=+-*/";

    for (let i = 1; i < length; i++) {


      let char = Math.floor(Math.random()*str.length + 1);
      pass +=str.charAt(char);
    }

    

    setPassword(pass);


  },[length,number,char,setPassword]);


  useEffect(()=>{passwordGenerator()},[length,setChar,setNumber,setPassword,passwordGenerator])


  const copyPassword = useCallback(()=>{

    passwordRef.current?.select()

    window.navigator.clipboard.writeText(password);

  },[password])


  return (
    <>

    <div className='box'> 

      <h1>Password Generator</h1>

      <input type="text" id='pass' 

      value={password}

       readOnly

       ref={passwordRef}

      />

      <button onClick={copyPassword} >Copy</button>


    </div>

   <div className='box2'>

  
    <input type="range" min={8} max={50}  value={length} onChange={(e)=>{setLength(e.target.value)}}/>Length:{length}

    <input type="checkbox" name="" id="char" defaultChecked={setChar} 
    onChange = {()=>{
      setChar((prev)=>!prev);
    }}

    />Character

    <input type="checkbox" name="" id="num"

    defaultChecked = {setNumber}

    onChange = {()=>{
      setNumber((prev)=>!prev);
    }}

    
    />Numbers

   

    </div>
   

      


      
    </>
  )
}

export default App
