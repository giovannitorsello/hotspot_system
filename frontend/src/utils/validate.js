export const rules = {
    companyName: [
      (v) => !!v || 'Questo campo è obbligatorio.',
      (v) => v.length <= 25 || 'Il nome azienda non può superare i 25 caratteri.',
    ],
    fiscalCode: [
      (v) => !!v || 'Questo campo è obbligatorio.',
      (v) => /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i.test(v) || 'Codice fiscale non valido.',
    ],
    email: [
        (v) => !!v || 'Campo Obbligatorio',
        (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Formato email non corretto.',
      ],
    vatCode: [
      (v) => !!v || 'Questo campo è obbligatorio.',
      (v) => /^[0-9]{11}$/.test(v) || 'Partita IVA non valida.',
    ],
    phone: [
      (v) => !!v || 'Questo campo è obbligatorio.',
      (v) => /^[0-9]{10}$/.test(v) || 'Numero di telefono non valido.',
    ],
    city:[
      (v) => !!v || 'Questo campo è obbligatorio.',
    ],
    address:[
        (v) => !!v || 'Questo campo è obbligatorio.',
    ]
    
  };