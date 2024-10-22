import { useNavigate } from "react-router";
import Layout from "../layout/Layout";

// productData
const teamNames = [
  {
    id: 1,
    image: "https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=",
    title: "Cricket",
  },
  {
    id: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1seSPWBfiU4-pQoT8RbtWhu98eR1iQCUNQ&s",
    title: "Football",
  },
  {
    id: 3,
    image: "https://media.istockphoto.com/id/183256716/photo/ball-and-basketball-court.jpg?s=612x612&w=0&k=20&c=dJwew7Yn4ltyv3pmKF-K9GVST_4LVMObSh-Wn5BzA3U=",
    title: "Basketball",
  },
  {
    id: 4,
    image: "https://media.istockphoto.com/id/1483011696/es/foto/pelota-de-tenis-raqueta-y-cancha-con-espacio-de-maqueta-fondo-borroso-o-sol-al-aire-libre.jpg?s=612x612&w=0&k=20&c=IDp_2jqpc6z1XhTQW6iiCCNbtUSQpT_kKp6ytmHW_PU=",
    title: "Tennis",
  },
  {
    id: 5,
    image: "https://media.istockphoto.com/id/1473259144/photo/volleyball-ball-and-net-in-voleyball-arena-during-a-match.jpg?s=612x612&w=0&k=20&c=vbn1S1xDKY7XO5lGdR14FCLhHkWXcjoS49j4-Cc1Ukg=",
    title: "Volleyball",
  },
  {
    id: 6,
    image: "https://media.istockphoto.com/id/1440967752/photo/field-hockey-player-on-artificial-grass-play-field.jpg?s=612x612&w=0&k=20&c=xj3wRZt5eYEppMPIuGqDHdPGbrN0HqZikuqyOVQwyNo=",
    title: "Hockey",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFibGUlMjB0ZW5uaXN8ZW58MHx8MHx8fDA%3D",
    title: "TableTennis",
  },
  {
    id: 9,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqArlAxGNo7myzYEjatDOttui5ny6SwSx37w&s",
    title: "Badminton",
  },
  {
    id: 10,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNR4Bo8x9HMMkq3M3kr0nJd6udEhG0TwKkcQ&s",
    title: "Chess",
  },
];

const Teams = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="mt-10">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold bg-slate-400 rounded-xl text-white">
            Our College Teams
          </h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {teamNames.map((item, index) => {
                const { image, title } = item;
                return (
                  <div key={index} className="p-4 w-full md:w-1/4">
                    <div className="h-full border border-gray-300 rounded-3xl overflow-hidden shadow-md cursor-pointer">
                      <img
                        onClick={() => navigate(`/teams/${title}`)} // Navigate to the selected team
                        className="lg:h-80  h-96 w-full"
                        src={image}
                        alt="team"
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          MANIT
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {title}
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Teams;
