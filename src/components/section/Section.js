import './section.css';
const Section = ({idElement='section', children}) => (
    <section id={idElement} className='section-page'>
        {children}
    </section>
);
export default Section;