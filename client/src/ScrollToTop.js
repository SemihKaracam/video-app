import { useEffect } from "react";
import { useLocation } from "react-router";

// React router dom yardımıyla componentlar arası routing yaparken sayfa geçişi olduğunda scroll en üstten başlasın diye kullanıyorum.
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;