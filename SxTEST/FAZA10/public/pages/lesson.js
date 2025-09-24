import React, { useEffect, useState } from 'https://esm.sh/react@18.3.1';
import { useParams, Link } from 'https://esm.sh/react-router-dom@6.26.2';

export default function Lesson(){
  const { id } = useParams();
  const [html,setHtml] = useState('<p>Loading...</p>');
  useEffect(()=>{
    setHtml(`<h2>Lecție #${id}</h2><p>Conținut mock demonstrativ.</p>`);
  },[id]);
  return React.createElement('div',{className:'card'},
    React.createElement('div',{dangerouslySetInnerHTML:{__html: html}}),
    React.createElement('p', null, React.createElement(Link,{to:'/courses'}, '← Înapoi la cursuri'))
  );
}