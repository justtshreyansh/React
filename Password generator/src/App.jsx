import { useState,useCallback,useEffect, useRef } from 'react'



function App() {
  const [length,setLength] = useState(8);
  const [numbersAllowed,setNumbers] = useState(false);
  const [charsetAllowed,setCharset] = useState(false);
  const [password,setPassword]= useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbersAllowed) str+="0123456789";
    if(charsetAllowed) str+="!@#$%^&*()_+{}|";
    for(let i=1;i<=length;i++){
      let char  = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);

  },[length,numbersAllowed,charsetAllowed,setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password) 
  },[password])
  useEffect(()=>{passwordGenerator()},[length,numbersAllowed,charsetAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} placeholder='password' className='outline-none py-1 px-3 w-full' readOnly ref={passwordRef}/>
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" name="" id="" min={6} max={100} value={length} className='cursor-pointer'
            onChange={(e)=>setLength(e.target.value)} />
            <label >Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" name="" id="numberInput" defaultChecked={numbersAllowed} onChange={()=>{
              setNumbers((prev)=>!prev)
            }} />
            <label htmlFor="">Numbers</label>
            <input type="checkbox" name="" id="numberInput" defaultChecked={charsetAllowed} onChange={()=>{
              setCharset((prev)=>!prev)
            }} />
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
