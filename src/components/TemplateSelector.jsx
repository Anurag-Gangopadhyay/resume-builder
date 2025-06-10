// TemplateSelector.jsx
export default function TemplateSelector({ selected, setSelected }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <button onClick={() => setSelected('template1')}
        style={{ backgroundColor: selected === 'template1' ? '#007bff' : '#ccc' }}>
        Template 1
      </button>
      <button onClick={() => setSelected('template2')}
        style={{ backgroundColor: selected === 'template2' ? '#007bff' : '#ccc' }}>
        Template 2
      </button>
	  <button onClick={() => setSelected('template3')}
        style={{ backgroundColor: selected === 'template3' ? '#007bff' : '#ccc' }}>
        Template 3
      </button>
    </div>
  );
}
