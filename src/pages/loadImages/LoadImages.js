import { useState, useEffect, useRef } from 'react';
import Section from "../../components/section/Section";
import './loadImages.css';
const LoadImages = () => {
    const [ data, setData ] = useState([]);
    const [ hasMore, setHasMore ] = useState(true);
    const [ offset, setOffset ] = useState(0);
    const elementRef = useRef(null);
    useEffect(() => {
        const OnIntersection = async (entries) => {
            const firstEntry = entries[0];
            if(firstEntry.isIntersecting && hasMore) await getData(offset);
        }
        const observer = new IntersectionObserver(OnIntersection);
        if(observer && elementRef.current) observer.observe(elementRef.current);
        return () => {
            if(observer) observer.disconnect();
        }
    },[data,hasMore,offset]);
    
    useEffect(() => {
        console.log(data);
    },[data])
    const getData = async (cantPoke) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${cantPoke}&limit=20`);
            const json = await res.json();
            if(json.results.length === 0) setHasMore(false);
            else {
                setData((data) => [...data, ...json.results]);
                setOffset((offset) => offset + 20);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Section>
            <h1>Cargar imagenes</h1>
            <ul className='lists'>
                {data.map((data, index) => (
                    <li key={index} className='list'>{data.name}</li>
                ))}
            </ul>
            {hasMore && <p ref={elementRef} className='los'>Cargando...</p>}
        </Section>
    );
}

export default LoadImages;