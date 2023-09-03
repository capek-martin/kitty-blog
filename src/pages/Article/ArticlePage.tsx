import { useEffect, useState } from "react";
import http from "../../api/axios";
import { apiUrl } from "../../api/apiUrl";
import { Article } from "../../types/app/article.type";
import { ArticleCard } from "../../components/ArticleCard/ArticleCard";

export const ArticlesPage = () => {
  const [articles, setArticles] = useState<any>();

  const getArticles = async () => {
    const response = await http.apiGet({
      url: `${apiUrl.ARTICLES}`,
    });
    if (response?.data && response?.data.items)
      setArticles(response.data.items);
  };

  /* const getImages = async () => {
    const response = await http.apiGet({
      url: `${apiUrl.IMAGES}`,
    });
    if (response?.data && response?.data.items)
      console.log(response?.data, "response?.data");
  }; */
  /* const createArticle = async () => {
    const response = await http.apiPost({
      url: `${apiUrl.ARTICLES}`,
      data: {
        title: "Why Do Cats Have Whiskers?",
        perex: "A cat's whiskers — or vibrissae — are a well-honed sen...",
        content:
          "Men might grow a beard or maintain a mustache just for extra style points, but the facial hair of the cat has nothing to do with fashion. A cat's whiskers — or vibrissae — are a well-honed sensory tool that helps a cat see in the dark and steer clear of hungry predators. Whiskers are highly sensitive tactile hairs that grow in patterns on a cat's muzzle, above its eyes and elsewhere on its body, like the ears, jaw and forelegs. At the root of each of these long, stiff hairs is a follicle loaded with nerves. By brushing its whiskers against an object, a cat can detect the precise location, size and texture of the object, even in the dark. This feature proves particularly useful for a cat trying to gauge whether it can fit into a tight space. Whiskers also detect changes in air currents, helping cats detect approaching dangers. Whiskers not only make cats aware of their surroundings, but can also provide humans with some insight into their pet's state of mind. For example, a set of taut whiskers, pulled back across the face, is a good indication that Kitty feels threatened, while relaxed whiskers, pointing away from the face, indicate a content cat. Of course, cats aren't the only mammals with whiskers. Most mammalian species, including primates, are equipped with these extrasensory receptors. Biologists think mammals developed whiskers because they needed help sensing their environments at night. The first small mammals shared the world with dinosaurs and had to adapt to hunting nocturnally, when their predators were less active. Whiskers helped these hungry animals find food and navigate dark terrain. This evolutionary adaptation also helps to explain why the whiskers of many nocturnal or aquatic carnivores — like rats, seals and walruses — are so prominent.",
        // imageId: "image-12345",
      },
    });
    if (response?.data) setArticles(response.data);
  }; */

  /* const handleOnSubmitAttachment = async () => {
    try {
      const formData = new FormData();
      formData.append("file", new File(["/kitten.jpg"], "kitten.jpg"));
      const response = await http.apiPostFiles({
        url: `${apiUrl.IMAGES}`,
        data: formData,
      });
    } catch (err) {
      console.log(err);
    }
  }; */

  useEffect(() => {
    /* const createTenant = async () => {
      await http.apiPost({
        url: `${apiUrl.TENANTS}`,
        data: {
          name: "capekma1@gmail.com",
          password: "Heslo",
        },
      });
    };

    createTenant(); */
    // getImages();
    //handleOnSubmitAttachment();
    getArticles();
    // createArticle();
  }, []);

  return (
    <>
      <h1>Recent articles</h1>
      <>
        {articles &&
          articles?.map((article: Article, index: number) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              <ArticleCard article={article} />
            </div>
          ))}
      </>
    </>
  );
};
