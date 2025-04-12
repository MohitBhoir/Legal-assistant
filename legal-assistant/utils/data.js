export const lawCategories = [
  {id: 0, name: 'All'},
  { id: 1, name: 'Family Law' },
  { id: 2, name: 'Criminal Law' },
  { id: 3, name: 'Corporate Law' },
  { id: 4, name: 'Civil Rights Law' },
  { id: 5, name: 'Constitutional Law' },
  { id: 6, name: 'Consumer Protection Law' },
  { id: 7, name: 'Environmental Law' },
  { id: 8, name: 'Immigration Law' },
  { id: 9, name: 'Intellectual Property Law' },
  { id: 10, name: 'Labor and Employment Law' },
  { id: 11, name: 'Tax Law' },
  { id: 12, name: 'Contract Law' },
  { id: 13, name: 'Tort Law' },
  { id: 14, name: 'Real Estate Law' },
  { id: 15, name: 'Banking and Finance Law' },
  { id: 16, name: 'Cyber Law' },
  { id: 17, name: 'International Law' },
  { id: 18, name: 'Administrative Law' },
  { id: 19, name: 'Bankruptcy Law' },
  { id: 20, name: 'Media and Entertainment Law' },
  { id: 21, name: 'Education Law' },
  { id: 22, name: 'Maritime Law' },
  { id: 23, name: 'Health Law' },
  { id: 24, name: 'Juvenile Law' },
  { id: 25, name: 'Elder Law' },
];


export const formateDate = (rawdate) => {
  const date = new Date(rawdate);
  const options = {
    weekday: 'short',  // e.g., "Fri"
    year: 'numeric',
    month: 'short',    // e.g., "Apr"
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  
  return date.toLocaleString('en-US', options);
}

export const adminEmails = [
    'jainpreet12052003@gmail.com',
    'finditupweb@gmail.com',
    'mohitbhoir93@gmail.com'
]