interface Props {
  setActive: () => void;
  hero: {
    name: string;
    gender: string;
    status: string;
    location: string;
    img: string;
    species: string;
  };
}

export default Props;
