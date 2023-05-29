interface Props {
  setActive: () => void;
  hero: {
    name: string | undefined;
    gender: string | undefined;
    status: string | undefined;
    location: string | undefined;
    img: string | undefined;
    species: string | undefined;
  };
}

export default Props;
