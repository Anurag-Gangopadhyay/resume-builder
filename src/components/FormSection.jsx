import React, { useEffect } from 'react';

export default function FormSection({ formData, setFormData }) {
	  useEffect(() => {
    const savedData = localStorage.getItem('resumeDraft');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, key, value, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][key] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addField = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };
  
  const removeField = (section, index) => {
	const updated = [...formData[section]];
	updated.splice(index, 1);
	setFormData({ ...formData, [section]: updated });
  };


  const sectionStyle = {
    backgroundColor: '#e0f0ff',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  };

  const labelStyle = {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
    marginTop: '10px'
  };

  const inputStyle = {
    width: '100%',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  };

  const buttonStyle = {
    padding: '8px 12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
    <div style={{ color: '#222' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#004080', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        Resume Builder
      </h2>

      {/* Personal Info */}
      <div style={sectionStyle}>
        <h3 style={{ fontSize: '20px', color: '#0050a0' }}>Personal Information</h3>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" style={inputStyle} />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={inputStyle} />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" style={inputStyle} />
		<input name="linked_in" value={formData.linked_in} onChange={handleChange} placeholder="Linked in" style={inputStyle} />
        <input name="github" value={formData.github} onChange={handleChange} placeholder="Github" style={inputStyle} />
        <input name="website" value={formData.website} onChange={handleChange} placeholder="Website" style={inputStyle} />
        <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma-separated)" style={inputStyle} />
        <textarea name="profile" value={formData.profile} onChange={handleChange} placeholder="Profile Summary" style={inputStyle} />
        <input name="languages" value={formData.languages} onChange={handleChange} placeholder="Languages (comma-separated)" style={inputStyle} />
      </div>

      {/* Education */}
      <div style={sectionStyle}>
        <h3 style={{ fontSize: '20px', color: '#0050a0' }}>Education</h3>
        {formData.education.map((edu, idx) => (
          <div key={idx}>
            <input value={edu.school} onChange={(e) => handleArrayChange(idx, 'school', e.target.value, 'education')} placeholder="School" style={inputStyle} />
            <input value={edu.degree} onChange={(e) => handleArrayChange(idx, 'degree', e.target.value, 'education')} placeholder="Degree" style={inputStyle} />
            <input value={edu.year} onChange={(e) => handleArrayChange(idx, 'year', e.target.value, 'education')} placeholder="Year" style={inputStyle} />
            <input value={edu.marks} onChange={(e) => handleArrayChange(idx, 'marks', e.target.value, 'education')} placeholder="ex: 86% /CGPA - 8.70" style={inputStyle} />
			<button onClick={() => removeField('education', idx)} style={buttonStyle}>- Delete Education</button>
          </div>
        ))}
        <button onClick={() => addField('education', { school: '', degree: '', year: '', marks: '' })} style={buttonStyle}>+ Add Education</button>
	  </div>

      {/* Experience */}
      <div style={sectionStyle}>
        <h3 style={{ fontSize: '20px', color: '#0050a0' }}>Experience</h3>
        {formData.experience.map((exp, idx) => (
          <div key={idx}>
            <input value={exp.company} onChange={(e) => handleArrayChange(idx, 'company', e.target.value, 'experience')} placeholder="Company" style={inputStyle} />
            <input value={exp.role} onChange={(e) => handleArrayChange(idx, 'role', e.target.value, 'experience')} placeholder="Role" style={inputStyle} />
            <input value={exp.duration} onChange={(e) => handleArrayChange(idx, 'duration', e.target.value, 'experience')} placeholder="Duration" style={inputStyle} />
            <textarea value={exp.description} onChange={(e) => handleArrayChange(idx, 'description', e.target.value, 'experience')} placeholder="Description (enter for bullets)" style={inputStyle} />
		 	<button onClick={() => removeField('experience', idx)} style={buttonStyle}>- Delete Experience</button>
		 </div>
        ))}
        <button onClick={() => addField('experience', { company: '', role: '', duration: '', description: '' })} style={buttonStyle}>+ Add Experience</button>
      </div>

      {/* Projects */}
      <div style={sectionStyle}>
        <h3 style={{ fontSize: '20px', color: '#0050a0' }}>Projects</h3>
        {formData.projects.map((proj, idx) => (
          <div key={idx}>
            <input value={proj.name} onChange={(e) => handleArrayChange(idx, 'name', e.target.value, 'projects')} placeholder="Project Name" style={inputStyle} />
            <textarea value={proj.description} onChange={(e) => handleArrayChange(idx, 'description', e.target.value, 'projects')} placeholder="Description (press enter for bullets)" style={inputStyle} />
			<button onClick={() => removeField('projects', idx)} style={buttonStyle}>- Delete Project</button>         
		 </div>
        ))}
        <button onClick={() => addField('projects', { name: '', description: '' })} style={buttonStyle}>+ Add Project</button>
      </div>
	  
	  <button
	  onClick={() => localStorage.setItem('resumeDraft', JSON.stringify(formData))}
	  style={{ padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', marginTop: '16px' }}
	  >
	  Save Draft
	  </button>
	  
	  <button
	  onClick={() => {
		localStorage.removeItem('resumeDraft');
		setFormData({
		  name: '', email: '', phone: '', skills: '', profile: '', languages: '',
		  education: [], experience: [], projects: []
		});
	  }}
	  style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', marginLeft: '10px' }}
	  >
	  Clear Draft
	  </button>


    </div>
  );
}
