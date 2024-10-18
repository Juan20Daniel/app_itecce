import './sectionNote.css';
const SectionNote = ({value, maxWidth=350}) => (
    <p className="section-note" style={{maxWidth:maxWidth}}>
        {value}
    </p>
);
export default SectionNote;