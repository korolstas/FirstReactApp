interface Props {
  setActive: () => void;
  hero: {
    name: string | undefined;
    gender: string | undefined;
    status: string | undefined;
    location: {
      name: string | undefined;
    };
    image: string | undefined;
    species: string | undefined;
  };
}

export default Props;
