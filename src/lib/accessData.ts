import { writable } from "svelte/store";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface Museum {
    id: number;
    title: string;
    state: string;
    location: string;
    address: string;
    subtitle: string;
    image: string;
    gallery: string[];
    description: string;
    price: number;
    rating: number;
    exhibitCount: string;
    contact: string;
    reviews: { name: string, rating: number, date: string, comment: string }[];
}

export const museums = writable<Museum[] | null>(null);

export async function fetchMuseums() {
    const querySnapshot = await getDocs(collection(db, "museums"));
    const museumList: Museum[] = [];

    querySnapshot.forEach((doc) => {
        museumList.push(doc.data() as Museum );
    });

    museums.set(museumList);
};

const addMuseums = async () => {
    try {
      for (let i = 0; i < updateMuseum.length; i++) {
        const museum = updateMuseum[i];
        const documentName = "Museum" + ((museum.id < 10) ? "0" + museum.id.toString() : museum.id.toString()); 
        const museumRef = doc(db, "museums",  documentName);
        await setDoc(museumRef, museum);
      }
      console.log("Museums added successfully");
    } catch (error) {
      console.error("Error adding museums: ", error);
    }
};

const updateMuseum: Museum[] = [
    {
        "id": 1,
        "title": "Visakha Museum",
        "state": "Andhra Pradesh",
        "location": "Visakhapatnam",
        "address": "505, Beach Road, Dutch Layout,\nPandurangapuram, Visakhapatnam, Andhra Pradesh 530017",
        "subtitle": "Museum displaying historic weapons, manuscripts & maritime items from Vizag.",
        "image": "https://media.istockphoto.com/id/1344745268/photo/coles-centennial-baptist-church-kurnool-andhra-pradesh-india.jpg?s=2048x2048&w=is&k=20&c=E0ymVsBUbQ5SnDS6M9Dw3LxWzbDJhvP3RGdUgYsgouk=",
        "gallery": [
            "https://media.istockphoto.com/id/1344745268/photo/coles-centennial-baptist-church-kurnool-andhra-pradesh-india.jpg?s=2048x2048&w=is&k=20&c=E0ymVsBUbQ5SnDS6M9Dw3LxWzbDJhvP3RGdUgYsgouk=", 
            "https://media.istockphoto.com/id/1452924147/photo/thotlakonda-ancient-buddhist-complex-is-situated-on-a-hill-near-bheemunipatnam-visakhapatnam.jpg?s=2048x2048&w=is&k=20&c=AVmiB_IeXnNpadZ1-Fq6_E3IXBw3EToCnzFDsY6Jivs=", 
            "https://media.istockphoto.com/id/463182269/photo/old-ruins-surrounded-by-grass-and-small-trees.jpg?s=2048x2048&w=is&k=20&c=4UQGvXZynwj6Ceekb5_MNXA22qk0xvgT0WEqsHd5P4c="
        ],
        "description": "The Visakha Museum, located in the coastal city of Visakhapatnam, showcases a remarkable collection of artifacts related to the region's rich maritime and military history. The museum houses an extensive display of ancient manuscripts, weaponry, historical documents, and various exhibits depicting the cultural heritage of Andhra Pradesh. Visitors can explore relics from the colonial era, old coins, and models of warships that played a crucial role in naval battles. The museum also highlights the impact of the Eastern Naval Command, providing a deeper understanding of the strategic importance of Vizag as a port city. It is a must-visit destination for history enthusiasts and those curious about India's naval legacy.",
        "price": 120,
        "rating": 4.3,
        "exhibitCount": "5000+",
        "contact": "andhrapradeshtourism.org.in | 022 4587 6932",
        "reviews": [
            { "name": "Suresh Babu", "rating": 4, "date": "February 10, 2025", "comment": "A great place to learn about Vizag's maritime history. The ship models and naval artifacts were fascinating." },
            { "name": "Anjali Rao", "rating": 5, "date": "January 25, 2025", "comment": "Impressive collection of historic weapons and manuscripts. The museum is well-maintained and informative." },
            { "name": "Michael Fernandes", "rating": 4, "date": "January 5, 2025", "comment": "The museum has a decent collection of war relics, though some sections could use better lighting." },
            { "name": "Ravi Teja", "rating": 4, "date": "December 20, 2024", "comment": "A must-visit for history buffs! The maritime section was the highlight for me." },
            { "name": "Lakshmi Prasad", "rating": 5, "date": "November 15, 2024", "comment": "Beautifully curated exhibits that tell the story of Visakhapatnam's naval importance. Worth every penny!" }
        ]
    },
    {
        "id": 2,
        "title": "Jawaharlal Nehru Museum",
        "state": "Arunachal Pradesh",
        "location": "Itanagar",
        "address": "4J2G+R22, Pappu Hills,\nItanagar, Arunachal Pradesh 791111",
        "subtitle": "Museum showcasing tribal artifacts and heritage of Arunachal Pradesh.",
        "image": "https://media.istockphoto.com/id/1305097376/photo/colorful-gateway-with-buddhist-prayer-flags-in-himalayas-tawang-india.jpg?s=2048x2048&w=is&k=20&c=kWyOu7Cj060NFLTbC6i2xIS6MJ7y_klIKVzxnPm8Erc=",
        "gallery": [
            "https://media.istockphoto.com/id/1305097376/photo/colorful-gateway-with-buddhist-prayer-flags-in-himalayas-tawang-india.jpg?s=2048x2048&w=is&k=20&c=kWyOu7Cj060NFLTbC6i2xIS6MJ7y_klIKVzxnPm8Erc=", 
            "https://media.istockphoto.com/id/1323555810/photo/morning-sunrise-view.jpg?s=2048x2048&w=is&k=20&c=3OX6Fq7tGDxqL_ImEpaMrTbUZ3wVvm4H2LNMfpYdrfc=", 
            "https://media.istockphoto.com/id/1324487945/photo/beautiful-buddhist-monastery-architecture-design-at-morning-from-low-angle.jpg?s=2048x2048&w=is&k=20&c=adGlRu28smo8VLpSAjKMbzx_NcFe6h-O70a1BcMOSRw="
        ],
        "description": "The Jawaharlal Nehru Museum in Itanagar is a cultural treasure trove, offering visitors a glimpse into the vibrant tribal heritage of Arunachal Pradesh. This museum features an extensive collection of traditional costumes, ancient weapons, handicrafts, and rare artifacts that highlight the customs and traditions of the indigenous tribes of the region. Visitors can explore exhibits on traditional weaving techniques, bamboo and cane crafts, and historical relics that narrate the evolution of Arunachal's diverse communities. The museum also hosts interactive sessions and cultural workshops to promote local art forms, making it an insightful destination for history enthusiasts and cultural explorers.",
        "price": 110,
        "rating": 4.4,
        "exhibitCount": "300+",
        "contact": "arunachalpradeshtourism.org.in | 022 7896 4321",
        "reviews": [
            { "name": "Tenzing Dorjee", "rating": 5, "date": "February 18, 2025", "comment": "A wonderful place to learn about Arunachal's rich tribal culture. The textile section was especially captivating." },
            { "name": "Meera Sharma", "rating": 4, "date": "January 30, 2025", "comment": "A well-organized museum with detailed exhibits. Could use more interactive displays, but overall a great experience!" },
            { "name": "John Matthew", "rating": 5, "date": "January 12, 2025", "comment": "Loved the variety of tribal artifacts on display. A must-visit for culture and history enthusiasts!" },
            { "name": "Anupam Das", "rating": 4, "date": "December 22, 2024", "comment": "Very informative and well-maintained. The weapons exhibit was particularly interesting." },
            { "name": "Tashi Namgyal", "rating": 5, "date": "November 28, 2024", "comment": "The museum perfectly captures the essence of Arunachal's diverse tribal heritage. The guided tour was excellent!" },
            { "name": "Priya Rajan", "rating": 3, "date": "October 15, 2024", "comment": "Good collection but the signage could be improved. More information in local languages would be helpful." }
        ]
    },
    {
        "id": 3,
        "title": "Assam State Museum",
        "state": "Assam",
        "location": "Guwahati",
        "address": "GNB Road, near Dighalipukhuri,\nAmbari, Guwahati, Assam 781001",
        "subtitle": "Museum showcasing Assam's heritage through sculptures and ancient artifacts.",
        "image": "https://media.istockphoto.com/id/861517934/photo/rang-ghar.jpg?s=2048x2048&w=is&k=20&c=mUxTKOXT50IYMfRYHe-yLhPx6VKTsxg_zr6K5dyvdpU=",
        "gallery": [
            "https://media.istockphoto.com/id/861517934/photo/rang-ghar.jpg?s=2048x2048&w=is&k=20&c=mUxTKOXT50IYMfRYHe-yLhPx6VKTsxg_zr6K5dyvdpU=", 
            "https://media.istockphoto.com/id/178727908/photo/stone-sculptures-of-hindu-gods-kamakhya-temple-guwahati-assam-india.jpg?s=2048x2048&w=is&k=20&c=u1EHKeXGSa2McNXJpjQpRi4veUjHOScVsPRoomlKo4Y=", 
            "https://media.istockphoto.com/id/1072951640/photo/tea-plantation-agriculture-terrace-in-sunrise-light.jpg?s=2048x2048&w=is&k=20&c=y7jjrujFdwVZ8g1zylxbq1PutgXhpO4Nfd3vTTHWXSk="
        ],
        "description": "The Assam State Museum, located in the heart of Guwahati, is a premier institution preserving and showcasing the rich cultural and historical heritage of Assam. Established in 1940, the museum houses an extensive collection of ancient sculptures, manuscripts, numismatic treasures, and ethnographic artifacts. Visitors can explore exhibits displaying Assamese traditional attire, weaponry, and centuries-old inscriptions that narrate the history of the region. The museum also features a dedicated section for archaeological findings, including rare terracotta pieces and stone carvings from various dynasties. With its diverse collections and educational exhibits, the museum serves as a gateway to Assam's glorious past.",
        "price": 120,
        "rating": 4.5,
        "exhibitCount": "1000+",
        "contact": "assamtourism.org.in | 022 6754 2389",
        "reviews": [
            { "name": "Rohit Das", "rating": 5, "date": "February 20, 2025", "comment": "A treasure trove of Assamese heritage! The ancient sculptures and manuscripts were truly mesmerizing." },
            { "name": "Priya Sen", "rating": 4, "date": "January 18, 2025", "comment": "Informative and well-maintained museum. The numismatic section was particularly interesting." },
            { "name": "Aditya Mahanta", "rating": 5, "date": "December 30, 2024", "comment": "Loved the variety of exhibits, especially the ethnographic section. A must-visit for history lovers." },
            { "name": "Mitali Borah", "rating": 4, "date": "November 15, 2024", "comment": "The traditional attire collection was spectacular. Would have liked more interactive elements." },
            { "name": "Deepak Sharma", "rating": 5, "date": "October 28, 2024", "comment": "Extremely well-curated museum that beautifully portrays Assam's cultural richness. The staff was very knowledgeable." },
            { "name": "Anjali Gogoi", "rating": 3, "date": "October 5, 2024", "comment": "Good collection but lighting could be improved in some sections. Worth a visit nonetheless." },
            { "name": "Rajiv Kumar", "rating": 5, "date": "September 22, 2024", "comment": "The archaeological section was outstanding! A perfect place to understand Assam's historical significance." }
        ]
    },
    {
        "id": 4,
        "title": "Bihar Museum",
        "state": "Bihar",
        "location": "Patna",
        "address": "Jawaharlal Nehru Marg, Bailey Road,\nPatna, Bihar 800001",
        "subtitle": "Modern museum displaying Bihar's history through galleries and cultural artifacts.",
        "image": "https://media.istockphoto.com/id/1129899392/photo/big-statue-of-buddha-bodh-gaya-india-famous-buddhist-place-of-interest.jpg?s=2048x2048&w=is&k=20&c=mzVgA7Es_q62FsPLFlX3za0aMlWGBFCnAgyEHdBX1Tc=",
        "gallery": [
            "https://media.istockphoto.com/id/1129899392/photo/big-statue-of-buddha-bodh-gaya-india-famous-buddhist-place-of-interest.jpg?s=2048x2048&w=is&k=20&c=mzVgA7Es_q62FsPLFlX3za0aMlWGBFCnAgyEHdBX1Tc=", 
            "https://media.istockphoto.com/id/1331301651/photo/lalit-narayan-mithila-university-is-also-known-as-lnmu-is-located-in-darbhanga-bihar-india.jpg?s=2048x2048&w=is&k=20&c=XIxPTo7ZD_ox7427rZP-skQRl6USXceWGnL33Uk2Tkc=", 
            "https://media.istockphoto.com/id/1365993607/photo/ashoka-pillar-at-vaishali-in-bihar-india.jpg?s=2048x2048&w=is&k=20&c=TvF_PugHUokYOVDXRx1DWLQir44iT-d8OIJBcUFoobo="
        ],
        "description": "The Bihar Museum, located in Patna, is a contemporary cultural institution dedicated to showcasing the rich history and heritage of Bihar. Opened in 2015, the museum boasts state-of-the-art galleries displaying ancient artifacts, sculptures, manuscripts, and cultural relics from various historical periods. The museum is particularly renowned for its collection of Mauryan-era artifacts, including the famous Didarganj Yakshi sculpture. It also features an interactive children's gallery, a section on tribal culture, and exhibits highlighting Bihar's contributions to art, politics, and spirituality. With its blend of modern architecture and historical treasures, the museum offers a unique learning experience for visitors of all ages.",
        "price": 100,
        "rating": 4.7,
        "exhibitCount": "5000+",
        "contact": "bihartourism.org.in | 022 3456 7891",
        "reviews": [
            { "name": "Amit Sinha", "rating": 5, "date": "February 22, 2025", "comment": "A stunning museum with a modern touch! The Didarganj Yakshi sculpture was mesmerizing." },
            { "name": "Neha Prasad", "rating": 4, "date": "January 25, 2025", "comment": "A well-designed museum with informative exhibits. The tribal heritage section was fascinating." },
            { "name": "Rakesh Kumar", "rating": 5, "date": "December 18, 2024", "comment": "Loved the children's gallery! A great place for families and history enthusiasts alike." },
            { "name": "Meera Sharma", "rating": 4, "date": "November 30, 2024", "comment": "A well-maintained museum with excellent audio tours. Highly recommended!" },
            { "name": "Vikram Singh", "rating": 5, "date": "November 10, 2024", "comment": "The architecture is amazing, and the collection is outstanding. A must-visit in Patna!" },
            { "name": "Arushi Gupta", "rating": 4, "date": "October 15, 2024", "comment": "The Mauryan artifacts collection is world-class. The museum design complements the exhibits perfectly." },
            { "name": "Rajesh Mishra", "rating": 5, "date": "September 20, 2024", "comment": "One of the best museums in India. The interactive displays engage visitors of all ages." },
            { "name": "Shalini Jha", "rating": 4, "date": "August 30, 2024", "comment": "Beautiful curation of Bihar's rich history. The temporary exhibitions are always worth checking out." }
        ]
    },
    {
        "id": 5,
        "title": "Mahant Ghasidas Memorial",
        "state": "Chhattisgarh",
        "location": "Raipur",
        "address": "6JVV+HX3 Ghadi Chowk, Raj Bhawan Road,\nCivil Lines, Raipur, Chhattisgarh 492001",
        "subtitle": "Museum with ancient coins, sculptures & tribal artifacts from Chhattisgarh's heritage.",
        "image": "https://media.istockphoto.com/id/1997267878/photo/view-of-surang-tila-temple-built-with-dress-stone-blocks-sirpur-mahasamund-chhattisgarh-india.jpg?s=2048x2048&w=is&k=20&c=qcUJqu0b3SZCVuzqf9YvYMdonsU7SqazH01xOWZnrgk=",
        "gallery": [
            "https://media.istockphoto.com/id/1997267878/photo/view-of-surang-tila-temple-built-with-dress-stone-blocks-sirpur-mahasamund-chhattisgarh-india.jpg?s=2048x2048&w=is&k=20&c=qcUJqu0b3SZCVuzqf9YvYMdonsU7SqazH01xOWZnrgk=", 
            "https://media.istockphoto.com/id/1246245424/photo/inside-the-old-gandikota-fort.jpg?s=2048x2048&w=is&k=20&c=E9yWWqXD4HDpo4cgXvYkvgqePwMq_DrOl7Off5e2u_c=", 
            "https://media.istockphoto.com/id/1264694668/photo/teerathgarh-falls-chhattisgarh-india.jpg?s=2048x2048&w=is&k=20&c=64U4XdACmOn0yqG5m-oe_t2NKOalTLg-CF8MnjzLP0I="
        ],
        "description": "The Mahant Ghasidas Memorial Museum in Raipur is a historical and cultural treasure trove showcasing the rich heritage of Chhattisgarh. Established in 1875 and later renovated, the museum houses an extensive collection of ancient coins, sculptures, tribal artifacts, and inscriptions. Visitors can explore exhibits featuring the artistic excellence of the region, including terracotta figurines, antique weaponry, and manuscripts that provide a glimpse into Chhattisgarh's past. The museum also boasts an impressive tribal section, displaying traditional costumes, jewelry, and cultural artifacts from indigenous communities. It serves as an important center for learning and preservation of the state's vibrant history.",
        "price": 110,
        "rating": 4.6,
        "exhibitCount": "2000+",
        "contact": "chhattisgadhtourism.org.in | 022 9876 5432",
        "reviews": [
            { "name": "Aarav Patel", "rating": 5, "date": "February 28, 2025", "comment": "An excellent museum that beautifully presents Chhattisgarh's cultural heritage. Loved the tribal section!" },
            { "name": "Suman Verma", "rating": 4, "date": "January 20, 2025", "comment": "A well-organized collection of artifacts. The ancient coins display was particularly impressive." },
            { "name": "Rohan Deshmukh", "rating": 5, "date": "December 15, 2024", "comment": "A must-visit for history enthusiasts. The sculpture collection was stunning!" },
            { "name": "Kavita Sharma", "rating": 4, "date": "November 22, 2024", "comment": "Very informative museum with a great audio guide. Accessibility features were well thought out." },
            { "name": "Mohit Singh", "rating": 5, "date": "October 30, 2024", "comment": "The tribal artifacts section gives deep insights into the indigenous cultures of Chhattisgarh. Excellent curation!" }
        ]
    },
    {
        "id": 6,
        "title": "Goa State Museum",
        "state": "Goa",
        "location": "Panaji",
        "address": "EDC Complex, Patto Colony,\nPanaji, Goa 403001",
        "subtitle": "Museum showcasing Goan heritage through artifacts, sculptures, and Portuguese relics.",
        "image": "https://media.istockphoto.com/id/2150136159/photo/the-basilica-of-bom-jesus-in-goa-india.jpg?s=2048x2048&w=is&k=20&c=4aS-qIYpr8eS8AC04IvFAkI6uqqQbc4buA-sjhiW1IM=",
        "gallery": [
            "https://media.istockphoto.com/id/2150136159/photo/the-basilica-of-bom-jesus-in-goa-india.jpg?s=2048x2048&w=is&k=20&c=4aS-qIYpr8eS8AC04IvFAkI6uqqQbc4buA-sjhiW1IM=", 
            "https://media.istockphoto.com/id/535553369/photo/goa_market_local.jpg?s=2048x2048&w=is&k=20&c=7pcyY8AHVeQQqyxVTK7pRRnoIbL3V0ZI9KdzVEK988o=", 
            "https://media.istockphoto.com/id/186841221/photo/mahalakshmi-temple-ponda-goa.jpg?s=2048x2048&w=is&k=20&c=kbxNKuE_KcIFyNsAdzq2LS8IM5lzudK9Zae_M7qNC84="
        ],
        "description": "The Goa State Museum, located in the heart of Panaji, is a cultural hub preserving and displaying the diverse heritage of India's smallest state. Established in 1977, the museum houses an extensive collection of artifacts that narrate Goa's rich historical journey through the ages. Visitors can explore galleries featuring ancient sculptures, coins, traditional musical instruments, and religious art that reflect the unique Indo-Portuguese cultural fusion characteristic of Goa. The museum's collection includes notable exhibits of Christian religious art, Hindu temple artifacts, and cultural objects from the Portuguese colonial era. With sections dedicated to natural history, furniture, and local crafts, the museum offers a comprehensive understanding of Goan culture and traditions.",
        "price": 50,
        "rating": 4.2,
        "exhibitCount": "8000+",
        "contact": "goatourism.org.in | 022 5432 1098",
        "reviews": [
            { "name": "Antonio Fernandes", "rating": 5, "date": "February 15, 2025", "comment": "A fantastic collection of Indo-Portuguese artifacts! The religious art section was particularly impressive." },
            { "name": "Sunita D'Souza", "rating": 4, "date": "January 12, 2025", "comment": "Well-organized museum with informative displays. Could use better lighting in some sections." },
            { "name": "Rahul Naik", "rating": 3, "date": "December 20, 2024", "comment": "Interesting collection but the building needs renovation. The coin collection was fascinating though." },
            { "name": "Melissa Pereira", "rating": 5, "date": "November 28, 2024", "comment": "The cultural exhibits perfectly capture Goa's unique heritage. The staff was very knowledgeable and helpful." }
        ]
    },
    {
        "id": 7,
        "title": "Maharaja Fateh Singh Museum",
        "state": "Gujarat",
        "location": "Vadodara",
        "address": "Lukshmi Vilas Palace Complex, Jawaharlal Nehru Marg,\nMoti Baug, Vadodara, Gujarat 390001",
        "subtitle": "Royal museum housed in a palace featuring European art collections and royal artifacts.",
        "image": "https://media.istockphoto.com/id/486811554/photo/akshardham-temple-at-new-delhi-india-cngltrv1109.jpg?s=2048x2048&w=is&k=20&c=1L-NZv9cmbEU82oDGr55u27xNi_JM2EQ--S8Gg1yLvs=",
        "gallery": [
            "https://media.istockphoto.com/id/486811554/photo/akshardham-temple-at-new-delhi-india-cngltrv1109.jpg?s=2048x2048&w=is&k=20&c=1L-NZv9cmbEU82oDGr55u27xNi_JM2EQ--S8Gg1yLvs=", 
            "https://media.istockphoto.com/id/1037295276/photo/rani-ki-vav-stepwell-at-patan-gujarat.jpg?s=2048x2048&w=is&k=20&c=e1E0-w-R0hGZmOst8oVPSxT6egDkPGus1dWBfyftLLE=", 
            "https://media.istockphoto.com/id/1276749203/photo/view-of-the-ancient-historic-place-chattardi-with-its-reflaction-in-lake-at-bhuj-gujarat-india.jpg?s=2048x2048&w=is&k=20&c=YAc6ddYwR4i_5_0VOnXi4dCMz2SqFP50N_1S6hr46U4="
        ],
        "description": "The Maharaja Fateh Singh Museum, situated within the magnificent Lukshmi Vilas Palace complex in Vadodara, is a treasure trove of artistic and historical significance. Originally built as a school for the Maharaja's children, this museum now houses an exceptional collection of European paintings, Oriental artifacts, and royal memorabilia. Visitors can marvel at the impressive collection of paintings by renowned European artists, including originals by Raja Ravi Varma, whose realistic depictions of Indian mythology and royal portraits are particularly noteworthy. The museum also displays an array of Japanese and Chinese artifacts, royal weapons, and sculptures. With its grand architecture and priceless collections, the museum offers a glimpse into the opulent lifestyle of the Gaekwad dynasty that once ruled the Baroda state.",
        "price": 200,
        "rating": 4.8,
        "exhibitCount": "700+",
        "contact": "gujarattourism.org.in | 022 7689 5412",
        "reviews": [
            { "name": "Rajesh Patel", "rating": 5, "date": "February 25, 2025", "comment": "An extraordinary museum with a world-class collection of European art. The Raja Ravi Varma paintings were simply breathtaking!" },
            { "name": "Ananya Mehta", "rating": 4, "date": "January 22, 2025", "comment": "The royal artifacts and European paintings were impressive. The palace setting adds to the grandeur of the experience." },
            { "name": "Vikram Gaekwad", "rating": 5, "date": "December 28, 2024", "comment": "A must-visit for art lovers and history enthusiasts. The Japanese and Chinese artifact collection was unexpected and fascinating." },
            { "name": "Meena Shah", "rating": 5, "date": "November 15, 2024", "comment": "The museum perfectly preserves the royal heritage of Vadodara. The audio guide was informative and engaging." },
            { "name": "David Thompson", "rating": 4, "date": "October 30, 2024", "comment": "Incredible collection housed in a beautiful setting. The staff was knowledgeable and the exhibits were well-maintained." },
            { "name": "Priya Joshi", "rating": 5, "date": "October 5, 2024", "comment": "One of the best museums in India! The Raja Ravi Varma gallery alone is worth the price of admission." }
        ]
    },
    {
        "id": 8,
        "title": "Kurukshetra Panorama Museum",
        "state": "Haryana",
        "location": "Kurukshetra",
        "address": "Brahma Sarovar, Sector 13,\nKurukshetra, Haryana 136118",
        "subtitle": "Museum combining Mahabharata war displays with hands-on science exhibits.",
        "image": "https://media.istockphoto.com/id/2161153871/photo/view-of-lat-ki-masjid-a-14th-century-monument-hissar-haryana-india.jpg?s=2048x2048&w=is&k=20&c=JV4zebAk7Ogrxfttok3iiT_1WIK6RJqHzfuEUkKUrQo=",
        "gallery": [
            "https://media.istockphoto.com/id/2161153871/photo/view-of-lat-ki-masjid-a-14th-century-monument-hissar-haryana-india.jpg?s=2048x2048&w=is&k=20&c=JV4zebAk7Ogrxfttok3iiT_1WIK6RJqHzfuEUkKUrQo=", 
            "https://media.istockphoto.com/id/2161153864/photo/view-of-gujri-mahal-built-by-firoz-shah-tughlaq-for-his-beloved-gujri-rani-in-the-14th.jpg?s=2048x2048&w=is&k=20&c=BkE0689KEhw9YYnxgNBl5SRnoLBKJc6ivh47FNvlxUA=", 
            "https://media.istockphoto.com/id/1276506796/photo/dehli-india.jpg?s=2048x2048&w=is&k=20&c=V5nbu2yVR2MfgUCO_r7PNOxq_bmr124sFLfxwMJCcVE="
        ],
        "description": "The Kurukshetra Panorama Museum is a unique cultural institution that brings the epic Mahabharata to life through immersive displays and dioramas. Located in the historic city of Kurukshetra, the museum features a stunning 360-degree panoramic depiction of the 18-day Mahabharata war, with intricate models and scenes portraying key moments from this ancient epic. The museum also houses a Science Centre with interactive exhibits that demonstrate scientific principles through hands-on experiences. Visitors can explore galleries showcasing archaeological finds from the region, historical artifacts, and multimedia presentations that narrate the spiritual and historical significance of Kurukshetra. The combination of mythological storytelling and scientific education makes this museum an enriching destination for visitors of all ages.",
        "price": 140,
        "rating": 4.5,
        "exhibitCount": "150+",
        "contact": "haryanatourism.org.in | 022 3214 9876",
        "reviews": [
            { "name": "Arjun Sharma", "rating": 5, "date": "February 18, 2025", "comment": "The panoramic depiction of the Mahabharata war is simply breathtaking! A must-visit for anyone interested in Indian mythology." },
            { "name": "Priya Khattar", "rating": 4, "date": "January 30, 2025", "comment": "Excellent blend of mythology and science. The interactive exhibits were educational and entertaining for our children." },
            { "name": "Ramesh Singh", "rating": 5, "date": "December 25, 2024", "comment": "A spectacular museum that brings our ancient epic to life. The attention to detail in the war scenes is remarkable." },
            { "name": "Neha Malhotra", "rating": 4, "date": "November 12, 2024", "comment": "Well-maintained museum with knowledgeable guides. The science section was a pleasant surprise." },
            { "name": "Sanjay Dutt", "rating": 3, "date": "October 20, 2024", "comment": "The panorama is impressive, but some of the scientific exhibits need updating. Still worth a visit though." }
        ]
    },
    {
        "id": 9,
        "title": "Shimla State Museum",
        "state": "Himachal Pradesh",
        "location": "Shimla",
        "address": "Chaura Maidan Road, Near Chaura Maidan,\nShimla, Himachal Pradesh 171004",
        "subtitle": "Colonial museum featuring Himachal's art, coins & cultural artifacts.",
        "image": "https://media.istockphoto.com/id/1371289822/photo/himalayan-village-town-of-kalpa-with-kailash-mountain-snow-peaks-at-himachal-pradesh-india.jpg?s=2048x2048&w=is&k=20&c=iZxymbtuy1OqXXMEJTOINIv96WhlA07osmsn0QHQ8GU=",
        "gallery": [
            "https://media.istockphoto.com/id/1371289822/photo/himalayan-village-town-of-kalpa-with-kailash-mountain-snow-peaks-at-himachal-pradesh-india.jpg?s=2048x2048&w=is&k=20&c=iZxymbtuy1OqXXMEJTOINIv96WhlA07osmsn0QHQ8GU=", 
            "https://media.istockphoto.com/id/1193124764/photo/wooden-pedestrian-hanging-bridge-over-tirthan-river-in-tirthan-valley-himachal-pradesh-india.jpg?s=2048x2048&w=is&k=20&c=HJI9mJXBu9-f4kAcgCGMMTwdRG2elaZB5O4tyx9ym6M=", 
            "https://media.istockphoto.com/id/1187136589/photo/inside-norbulingka-institute-temple-dharamsala-india.jpg?s=2048x2048&w=is&k=20&c=MKJENOwUR41qnY270FyDCSGsDcKaO1zzLK8jbuSIjOo="
        ],
        "description": "The Shimla State Museum, housed in a charming colonial building dating back to 1974, is a cultural repository showcasing the rich heritage of Himachal Pradesh. Set amidst the picturesque hills of Shimla, the museum features an impressive collection of ancient artifacts, traditional costumes, paintings, and handicrafts that reflect the diverse cultural tapestry of the Himalayan state. Visitors can explore galleries displaying Pahari miniature paintings, tribal jewelry, numismatic collections, and archaeological treasures excavated from various sites across the region. The museum also houses a dedicated section on Buddhist art, featuring sculptures, temple carvings, and manuscripts that highlight the region's spiritual heritage. With its well-preserved exhibits and informative displays, the museum offers a comprehensive glimpse into Himachal's cultural evolution and artistic traditions.",
        "price": 130,
        "rating": 4.4,
        "exhibitCount": "1200+",
        "contact": "himachalpradeshtourism.org.in | 022 8765 1234",
        "reviews": [
            { "name": "Vikram Thakur", "rating": 5, "date": "February 10, 2025", "comment": "A wonderful collection showcasing Himachal's rich cultural heritage. The Pahari paintings were exquisite!" },
            { "name": "Anita Chauhan", "rating": 4, "date": "January 15, 2025", "comment": "Beautiful colonial building housing impressive artifacts. The tribal jewelry collection was particularly fascinating." },
            { "name": "Rahul Sood", "rating": 5, "date": "December 20, 2024", "comment": "An excellent museum that perfectly captures the essence of Himachali culture. The staff was very knowledgeable." },
            { "name": "Meera Joshi", "rating": 4, "date": "November 25, 2024", "comment": "Well-maintained exhibits with detailed information. The Buddhist art section was a highlight." },
            { "name": "Arun Kumar", "rating": 3, "date": "October 30, 2024", "comment": "Good collection but could use better lighting in some areas. The numismatic display was impressive though." },
            { "name": "Sarah Williams", "rating": 5, "date": "October 5, 2024", "comment": "A hidden gem in Shimla! The traditional costumes and handicrafts provided great insight into local culture." },
            { "name": "Deepak Sharma", "rating": 4, "date": "September 12, 2024", "comment": "The colonial architecture adds charm to this well-curated museum. Worth setting aside a couple of hours for." }
        ]
    },
    {
        "id": 10,
        "title": "Jharkhand War Memorial",
        "state": "Jharkhand",
        "location": "Ranchi",
        "address": "Morabadi Ground, Circular Road,\nRanchi, Jharkhand 834008",
        "subtitle": "Museum honoring soldiers with war artifacts and records of Jharkhand's martyrs.",
        "image": "https://media.istockphoto.com/id/2185124613/photo/a-beautiful-jain-temple-made-with-white-marble-situated-at-madhuban-in-jharkhand-in-india.jpg?s=2048x2048&w=is&k=20&c=yj6TKy09DMj56FIP7UKhFDdO7KpxlUHwKpfJFXUx9cI=",
        "gallery": [
            "https://media.istockphoto.com/id/2185124613/photo/a-beautiful-jain-temple-made-with-white-marble-situated-at-madhuban-in-jharkhand-in-india.jpg?s=2048x2048&w=is&k=20&c=yj6TKy09DMj56FIP7UKhFDdO7KpxlUHwKpfJFXUx9cI=", 
            "https://media.istockphoto.com/id/2190211782/photo/terracotta-depiction-of-goddess-mahishasurmardini-on-the-durga-temple-of-chhai-taraf-temple.jpg?s=2048x2048&w=is&k=20&c=Eo-eaadEf47O92uwBPG6Ml4eiRF29n7m0VaXK1EjLEk=", 
            "https://media.istockphoto.com/id/1467369062/photo/beautiful-handmade-chhau-mask-for-classical-dance-displayed-in-a-shop-for-sale-in-blurred.jpg?s=2048x2048&w=is&k=20&c=pANg0sU7Ydg2yhhlFVMuaf48ClhXckMgjQv7xybp7b4="
        ],
        "description": "The Jharkhand War Memorial in Ranchi stands as a solemn tribute to the brave soldiers from the state who sacrificed their lives for the nation. This memorial-cum-museum houses an impressive collection of war artifacts, weapons, uniforms, and photographic displays that document the military contributions of Jharkhand's sons and daughters. Visitors can explore galleries featuring detailed records of the state's martyrs, personal belongings of soldiers, and interactive exhibits that narrate stories of extraordinary courage and patriotism. The memorial also includes a peaceful garden with commemorative plaques and sculptures honoring fallen heroes. Regular ceremonies are held to pay homage to the martyrs, making it not just a museum but a living monument that keeps the spirit of sacrifice and valor alive in public memory.",
        "price": 120,
        "rating": 4.7,
        "exhibitCount": "300+",
        "contact": "jharkhandtourism.org.in | 022 6543 8901",
        "reviews": [
            { "name": "Rajendra Singh", "rating": 5, "date": "February 22, 2025", "comment": "A moving tribute to our brave soldiers. The personal stories of the martyrs were deeply touching." },
            { "name": "Priyanka Kumari", "rating": 5, "date": "January 26, 2025", "comment": "Visited on Republic Day and was overwhelmed by the patriotic atmosphere. The artifacts are well-preserved and the displays are informative." },
            { "name": "Vijay Kumar", "rating": 5, "date": "December 16, 2024", "comment": "An excellently maintained memorial that does justice to our fallen heroes. The weapon collection is impressive and historically significant." },
            { "name": "Neha Srivastava", "rating": 4, "date": "November 10, 2024", "comment": "A somber and educational experience. The interactive exhibits help visitors connect with the sacrifices made by our soldiers." },
            { "name": "Alok Mahato", "rating": 5, "date": "October 21, 2024", "comment": "Proud to see my uncle's name among the honored. This memorial preserves our state's military legacy beautifully." },
            { "name": "Kavita Sharma", "rating": 4, "date": "September 15, 2024", "comment": "A must-visit for every Indian citizen. The guide was knowledgeable and shared many untold stories of bravery." },
            { "name": "Ranveer Munda", "rating": 5, "date": "August 15, 2024", "comment": "Visited on Independence Day. The ceremony was moving and the museum itself is a perfect tribute to our martyrs." },
            { "name": "Amit Das", "rating": 4, "date": "July 26, 2024", "comment": "Well-designed memorial with thoughtful exhibits. The garden area provides a peaceful space for reflection." }
        ]
    },
    {
        "id": 11,
        "title": "Visvesvaraya Museum",
        "state": "Karnataka",
        "location": "Bengaluru",
        "address": "Kasturba Road, Ambedkar Veedhi,\nBengaluru, Karnataka 560001",
        "subtitle": "Science museum with interactive exhibits on space, mechanics and technology.",
        "image": "https://media.istockphoto.com/id/945125284/photo/india-mysore.jpg?s=2048x2048&w=is&k=20&c=Lb0KnQZPmoDy3c375hDXOf_AkO0NWspoL_VQFLG67Dk=",
        "gallery": [
            "https://media.istockphoto.com/id/945125284/photo/india-mysore.jpg?s=2048x2048&w=is&k=20&c=Lb0KnQZPmoDy3c375hDXOf_AkO0NWspoL_VQFLG67Dk=", 
            "https://media.istockphoto.com/id/1268998403/photo/murdeshwar-temple-early-morning-view-from-low-angle-image.jpg?s=2048x2048&w=is&k=20&c=1oYogCbLSFfvKdU6QvfhboBO2nJo1UUGv_5Cx4_6egQ=", 
            "https://media.istockphoto.com/id/1013707692/photo/south-indian-temple-relief-with-hero-arjuna-with-bow-and-arrows-in-hands-hindu-structure-from.jpg?s=2048x2048&w=is&k=20&c=LhVSztmkbhOTCvRbuINUQGd7imhuy6MosxKBsGoT6Ps="
        ],
        "description": "The Visvesvaraya Industrial and Technological Museum in Bengaluru is a prestigious institution dedicated to science education and technological innovation. Established in 1962 to honor the legacy of Sir M. Visvesvaraya, a renowned Indian engineer and statesman, the museum features seven fascinating floors of interactive exhibits covering various scientific principles and technological advancements. Visitors can explore engaging displays on space exploration, engines, mechanics, electronics, biotechnology, and computer science. The museum houses working models, simulators, and hands-on experiments that make complex scientific concepts accessible to visitors of all ages. Popular attractions include the full-scale replica of the Wright Brothers' aircraft, the dinosaur exhibit, and the immersive 3D film experience. With its commitment to making science education enjoyable, the museum serves as an important center for STEM learning and inspiration.",
        "price": 175,
        "rating": 4.6,
        "exhibitCount": "1800+",
        "contact": "karnataktourism.org.in | 022 9087 6543",
        "reviews": [
            { "name": "Aditya Prakash", "rating": 5, "date": "February 19, 2025", "comment": "A paradise for science enthusiasts! The interactive exhibits on mechanics and engines were particularly fascinating." },
            { "name": "Lalitha Krishnan", "rating": 4, "date": "January 28, 2025", "comment": "Great educational experience for my children. The space gallery and flight simulator were their favorites." },
            { "name": "Raj Malhotra", "rating": 5, "date": "December 23, 2024", "comment": "Excellent museum with well-explained scientific concepts. The Engine Hall and the Wright Brothers' aircraft replica were highlights." },
            { "name": "Sarita Devi", "rating": 4, "date": "November 15, 2024", "comment": "Well-maintained exhibits with knowledgeable guides. Some interactive displays needed repairs, but overall a great learning experience." },
            { "name": "Venkat Rao", "rating": 5, "date": "October 25, 2024", "comment": "As a science educator, I found the museum exceptionally well-curated. The biotechnology section was particularly impressive." },
            { "name": "Meena Kumari", "rating": 4, "date": "September 30, 2024", "comment": "Our school trip was a huge success! The children were engaged throughout and learned so much from the hands-on exhibits." }
        ]
    },
    {
        "id": 12,
        "title": "Napier Museum",
        "state": "Kerala",
        "location": "Thiruvananthapuram",
        "address": "LMS Vellayambalam Road, Near Zoo,\nPalayam, Thiruvananthapuram, Kerala 695033",
        "subtitle": "Historic museum with art & artifacts in a stunning Indo-Saracenic architectural building.",
        "image": "https://media.istockphoto.com/id/113553219/photo/trivandrum-temple-kerala-india.jpg?s=2048x2048&w=is&k=20&c=lpEhKkqSFNGfg3NPIM-v-xIL8JRmX9e2vhK4n4oqNRQ=",
        "gallery": [
            "https://media.istockphoto.com/id/113553219/photo/trivandrum-temple-kerala-india.jpg?s=2048x2048&w=is&k=20&c=lpEhKkqSFNGfg3NPIM-v-xIL8JRmX9e2vhK4n4oqNRQ=", 
            "https://media.istockphoto.com/id/507307396/photo/theyyam-performance.jpg?s=2048x2048&w=is&k=20&c=ymYHKkaX6r-IMtFGF0tEKl12_xP0zw64nMInsdak8NA=", 
            "https://media.istockphoto.com/id/501432908/photo/green-tea-plantations-in-munnar-kerala-india.jpg?s=2048x2048&w=is&k=20&c=6ZLBaXLF6PI9vbHO9xfIA0Dqm_mP3u9ydaYFIzzXSow="
        ],
        "description": "The Napier Museum, an architectural masterpiece in Thiruvananthapuram, is renowned for its unique Indo-Saracenic design featuring Gothic and Kerala architectural elements. Built in 1880 and named after Lord Napier, the then Governor of Madras, this museum houses a rare collection of archaeological and historical artifacts, bronze idols, ancient ornaments, temple chariots, and ivory carvings. The museum's natural ventilation system creates a comfortable interior climate without modern air conditioning. Surrounded by the scenic Museum Gardens, the building itself is famous for its multi-colored exterior, ornate roof, and intricate design details. Visitors can explore exhibits showcasing Kerala's rich cultural heritage, including ancient musical instruments, traditional costumes, and decorative art pieces that highlight the region's artistic legacy.",
        "price": 120,
        "rating": 4.5,
        "exhibitCount": "350+",
        "contact": "keralatourism.org.in | 022 4762 9841",
        "reviews": [
            { "name": "Anoop Menon", "rating": 5, "date": "February 15, 2025", "comment": "The building itself is a work of art! The ancient bronze collection is exceptional and well-preserved." },
            { "name": "Sarah Williams", "rating": 4, "date": "January 30, 2025", "comment": "A must-visit in Trivandrum. The ivory carvings and historical artifacts are impressive, though some labels could be more informative." },
            { "name": "Rajesh Kumar", "rating": 5, "date": "January 12, 2025", "comment": "Spent hours exploring the various exhibits. The traditional musical instruments section was fascinating!" },
            { "name": "Meera Nair", "rating": 4, "date": "December 28, 2024", "comment": "Beautiful museum with rich cultural heritage on display. The architecture of the building is stunning." },
            { "name": "Thomas Jacob", "rating": 5, "date": "November 20, 2024", "comment": "An architectural marvel housing incredible artifacts. The natural cooling system of the building is ingenious!" },
            { "name": "Priya Varghese", "rating": 4, "date": "November 5, 2024", "comment": "Wonderful collection of Kerala's historical treasures. Would recommend visiting in the morning when it's less crowded." }
        ]
    },
    {
        "id": 13,
        "title": "State Museum",
        "state": "Madhya Pradesh",
        "location": "Bhopal",
        "address": "Shymala Hills, Near Van Vihar National Park,\nBhopal, Madhya Pradesh 462002",
        "subtitle": "Museum featuring MP history with sculptures, artifacts & ancient art from Central India.",
        "image": "https://media.istockphoto.com/id/481494314/photo/gwalior-fort.jpg?s=2048x2048&w=is&k=20&c=2vkrVThTF1J2bkmrbNs1lPqlbs6lIlDDHvzCWOwaFiM=",
        "gallery": [
            "https://media.istockphoto.com/id/481494314/photo/gwalior-fort.jpg?s=2048x2048&w=is&k=20&c=2vkrVThTF1J2bkmrbNs1lPqlbs6lIlDDHvzCWOwaFiM=", 
            "https://media.istockphoto.com/id/453576963/photo/human-sculptures-at-vishvanatha-temple-khajuraho-india-unesco-heritage-site.jpg?s=2048x2048&w=is&k=20&c=Gvr6ZU7EmWjZ4VTr_AWIudxoBvZHKPwLzF4VOHeTMyY=", 
            "https://media.istockphoto.com/id/967030882/photo/jahaz-mahal-ship-palace-in-sunrise-mandu-madhya-pradesh-india.jpg?s=2048x2048&w=is&k=20&c=JnvKKFZ97bUpztDxqjU13__F8v70QpYVke5AXBY129c="
        ],
        "description": "The State Museum of Madhya Pradesh, located in the heart of Bhopal, is a cultural treasure house established in 1965. This comprehensive museum showcases the rich archaeological and artistic heritage of Central India spanning several centuries. Visitors can explore an impressive collection of stone sculptures from the Gupta and Paramara periods, rare manuscripts, Jain bronzes, and prehistoric artifacts discovered across the state. The museum is particularly renowned for its exceptional display of ancient coins, miniature paintings, and tribal art that reflect the diverse cultural traditions of Madhya Pradesh. A highlight is the fossil collection, including dinosaur fossils from the Narmada Valley region. The imposing building is divided into multiple galleries arranged chronologically, providing a fascinating journey through the region's evolution from prehistoric times to the modern era. The ethnographic section offers insights into the lifestyles of various indigenous communities of central India.",
        "price": 120,
        "rating": 4.4,
        "exhibitCount": "450+",
        "contact": "madhyapradeshtourism.org.in | 022 4589 3274",
        "reviews": [
            { "name": "Vinod Sharma", "rating": 5, "date": "February 22, 2025", "comment": "The sculpture gallery is outstanding! Some pieces date back to the 10th century and are remarkably well-preserved." },
            { "name": "Aruna Tiwari", "rating": 4, "date": "February 5, 2025", "comment": "Excellent collection that tells the story of MP's rich heritage. The prehistoric artifacts were particularly interesting." },
            { "name": "David Miller", "rating": 4, "date": "January 15, 2025", "comment": "As an archaeologist, I was impressed by the range of exhibits. The coin collection is world-class." },
            { "name": "Sapna Joshi", "rating": 5, "date": "December 12, 2024", "comment": "A gem in Bhopal! The tribal art section provides wonderful insights into indigenous cultures." },
            { "name": "Prakash Dubey", "rating": 3, "date": "November 18, 2024", "comment": "Good collection but could use better lighting in some sections. The fossil exhibits were fascinating though." },
            { "name": "Meenakshi Rao", "rating": 5, "date": "October 30, 2024", "comment": "Spent an entire day here and still didn't see everything. The miniature paintings are exquisite!" },
            { "name": "Rahul Verma", "rating": 4, "date": "October 10, 2024", "comment": "A comprehensive museum with excellent historical context. Worth visiting if you're interested in Central Indian history." }
        ]
    },
    {
        "id": 14,
        "title": "Chhatrapati Shivaji Museum",
        "state": "Maharashtra",
        "location": "Mumbai",
        "address": "159-161, Mahatma Gandhi Road, Fort,\nMumbai, Maharashtra 400023",
        "subtitle": "Premier museum with art and artifacts housed in a stunning Indo-Saracenic building.",
        "image": "https://media.istockphoto.com/id/583958532/photo/kailas-temple-in-ellora-caves-complex-in-india.jpg?s=2048x2048&w=is&k=20&c=bOjSFB5NzRFldxcCteDJ59t1jdu_8IoPOV-kXAyHV0E=",
        "gallery": [
            "https://media.istockphoto.com/id/583958532/photo/kailas-temple-in-ellora-caves-complex-in-india.jpg?s=2048x2048&w=is&k=20&c=bOjSFB5NzRFldxcCteDJ59t1jdu_8IoPOV-kXAyHV0E=", 
            "https://media.istockphoto.com/id/1167686139/photo/waterfall.jpg?s=2048x2048&w=is&k=20&c=m3ErZWQXWYxcCfwLC7WYp5tYv0NS9GjPZKnGgUGXX8s=", 
            "https://media.istockphoto.com/id/1136161968/photo/chatrapati-shivaji-maharaj-statue-katraj-pune-maharashtra.jpg?s=2048x2048&w=is&k=20&c=nvHRnznyEmHHUSUGPXVT7ckhqKTnY6zpiXWXzbvs2qQ="
        ],
        "description": "The Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, formerly known as the Prince of Wales Museum, is one of India's premier cultural institutions located in the heart of Mumbai. Designed by George Wittet in 1915, the museum is a magnificent example of Indo-Saracenic architecture blending Indian, Islamic, and British elements. The museum houses over 50,000 artifacts spread across three main sections: Art, Archaeology, and Natural History. Visitors can marvel at its extensive collection of ancient Indian sculptures, miniature paintings, decorative arts, and Mughal-era artifacts. The European Art section features rare porcelain, jade collections, and weaponry from different historical periods. The Natural History section displays a diverse array of flora and fauna specimens. A highlight is the impressive numismatic collection featuring rare coins from various dynasties that ruled the Indian subcontinent. The museum's central dome, surrounded by a beautiful garden, creates an atmosphere of tranquility amidst the bustling city, making it not just a repository of artifacts but a cultural oasis.",
        "price": 185,
        "rating": 4.7,
        "exhibitCount": "50,000+",
        "contact": "maharashtratourism.org.in | 022 4673 8901",
        "reviews": [
            { "name": "Amit Deshmukh", "rating": 5, "date": "February 27, 2025", "comment": "World-class museum with incredible artifacts. The Indus Valley Civilization exhibits were particularly fascinating." },
            { "name": "Elizabeth Chen", "rating": 5, "date": "February 12, 2025", "comment": "The building itself is worth the visit! Inside, the miniature paintings collection is breathtaking." },
            { "name": "Neha Sharma", "rating": 4, "date": "January 28, 2025", "comment": "Excellent collection spanning centuries of Indian history. Audio guide was informative, though some exhibits could use better lighting." },
            { "name": "Rajendra Patil", "rating": 5, "date": "January 9, 2025", "comment": "A treasure trove of Indian heritage. The sculptures from the Gupta period are masterpieces!" },
            { "name": "Sophia Martinez", "rating": 5, "date": "December 20, 2024", "comment": "As an art historian, I was impressed by the breadth and quality of the collections. The textile gallery is particularly well-curated." },
            { "name": "Vikram Joshi", "rating": 4, "date": "November 25, 2024", "comment": "Spent half a day here and still didn't see everything. The numismatic collection is world-class." },
            { "name": "Priyanka Chopra", "rating": 5, "date": "November 3, 2024", "comment": "One of Mumbai's cultural gems. The Indo-Saracenic architecture is stunning, and the artifacts are beautifully displayed." },
            { "name": "James Wilson", "rating": 4, "date": "October 14, 2024", "comment": "A must-visit for anyone interested in Indian history and art. The Nepali and Tibetan art sections were unexpected highlights." }
        ]
    },
    {
        "id": 15,
        "title": "Manipur State Museum",
        "state": "Manipur",
        "location": "Imphal",
        "address": "Kangla Palace Road, Near Polo Ground,\nImphal West, Manipur 795001",
        "subtitle": "Museum showcasing Manipuri tribal heritage, costumes & cultural artifacts from Northeast India.",
        "image": "https://media.istockphoto.com/id/1173721130/photo/govindaji-kangla-fort-imphal-manipur.jpg?s=2048x2048&w=is&k=20&c=IOcTQFRCFzlSDVyLJD23RAW1J9cM8zlA8DTilI0koFM=",
        "gallery": [
            "https://media.istockphoto.com/id/1173721130/photo/govindaji-kangla-fort-imphal-manipur.jpg?s=2048x2048&w=is&k=20&c=IOcTQFRCFzlSDVyLJD23RAW1J9cM8zlA8DTilI0koFM=", 
            "https://media.istockphoto.com/id/1410737005/photo/imphal-view-tower-present-at-top-of-the-cheirao-ching-hill-manipur.jpg?s=2048x2048&w=is&k=20&c=ya6R1qEfPb21Xn4M6Yl7mxsDgOMRiHCjFNxMUwIhPlY=", 
            "https://media.istockphoto.com/id/2141488372/photo/historical-monument-of-manipur-kangla-fort-shri-shri-govindajee-temple-and-citadal-in-imphal.jpg?s=2048x2048&w=is&k=20&c=xvkoatP--GTqJM5OhU4i9BzLkJH6YSPx9tg2YuQS2NY="
        ],
        "description": "The Manipur State Museum, established in 1969, stands as a vital cultural repository preserving the rich heritage of this northeastern state. Located in Imphal, the museum offers visitors a comprehensive glimpse into Manipur's diverse tribal cultures and historical evolution. The museum houses an impressive collection of traditional costumes, jewelry, and ceremonial objects from various tribes including Meitei, Naga, Kuki, and others native to the region. Notable exhibits include ancient manuscripts written on handmade paper, royal regalia from the Manipuri monarchy, intricate wood carvings, and traditional war implements. The archaeological section displays prehistoric tools, pottery, and stone sculptures that trace human settlement in the region. A highlight is the dedicated gallery showcasing Manipur's famous classical dance form, Manipuri, with costumes, masks, and instruments used in performances. The ethnographic section features meticulously recreated tribal homes and everyday objects that provide insight into indigenous lifestyles. For history enthusiasts, the museum also documents Manipur's role during World War II when it was a significant battleground between British-Indian forces and Japanese troops.",
        "price": 110,
        "rating": 4.2,
        "exhibitCount": "320+",
        "contact": "manipurtourism.org.in | 022 4398 7652",
        "reviews": [
            { "name": "Bimol Singh", "rating": 5, "date": "February 20, 2025", "comment": "A wonderful showcase of Manipuri culture. The traditional costume collection is vibrant and comprehensive." },
            { "name": "Ningol Chanu", "rating": 4, "date": "February 2, 2025", "comment": "As a Manipuri, I was proud to see our heritage so well preserved. The ancient manuscripts section is particularly valuable." },
            { "name": "Ryan Thompson", "rating": 4, "date": "January 18, 2025", "comment": "Fascinating insight into Northeast Indian cultures that aren't widely represented elsewhere. The tribal artifact collection is impressive." },
            { "name": "Laishram Tomba", "rating": 5, "date": "December 30, 2024", "comment": "The museum does an excellent job of documenting our state's unique cultural identity. The WWII section was unexpectedly moving." },
            { "name": "Sophia Lee", "rating": 3, "date": "November 22, 2024", "comment": "Interesting collections, though some exhibits could use better English translations. The tribal jewelry displays were beautiful." },
            { "name": "Thoibi Devi", "rating": 5, "date": "October 30, 2024", "comment": "A hidden gem in Northeast India! The Manipuri dance gallery brought tears to my eyes - such a beautiful preservation of our art form." }
        ]
    },
    {
        "id": 16,
        "title": "Don Bosco Museum",
        "state": "Meghalaya",
        "location": "Shillong",
        "address": "Mawlai, Don Bosco Square,\nShillong, Meghalaya 793008",
        "subtitle": "Northeast India's largest cultural museum with tribal artifacts & exhibits spanning seven states.",
        "image": "https://media.istockphoto.com/id/1272154334/photo/the-all-saints-cathedral-in-the-town-of-shillong-in-northeast-india.jpg?s=2048x2048&w=is&k=20&c=u1b0qicT7O6CDNyQTB1INkDI90vkqTJtXtnw6qvZbPY=",
        "gallery": [
            "https://media.istockphoto.com/id/1272154334/photo/the-all-saints-cathedral-in-the-town-of-shillong-in-northeast-india.jpg?s=2048x2048&w=is&k=20&c=u1b0qicT7O6CDNyQTB1INkDI90vkqTJtXtnw6qvZbPY=", 
            "https://media.istockphoto.com/id/671902902/photo/seven-sisters-waterfall.jpg?s=2048x2048&w=is&k=20&c=5tPmyUIdEN05PoHoJ3OGXBgWKkajQQpZbjtON_EH6wE=", 
            "https://media.istockphoto.com/id/1744054952/photo/horizon-over-agricultural-field-and-green-spring-meadow-countryside-farmland-with-rice-paddy.jpg?s=2048x2048&w=is&k=20&c=BpZu5YxAMQUwvOAp4viQ41fQj2XHl-Gu5wZsQp4fYo4="
        ],
        "description": "The Don Bosco Centre for Indigenous Cultures (DBCIC), commonly known as the Don Bosco Museum, stands as Northeast India's premier cultural institution in Shillong. Established in 2001, this seven-story hexagonal building houses a comprehensive collection representing all eight northeastern states. The museum features 17 galleries meticulously documenting the region's 200+ tribal communities. Visitors can explore traditional tribal homes, clothing, weapons, agricultural tools, and musical instruments. Each floor is thematically organized, with galleries dedicated to prehistory, land and people, clothing and ornaments, religious beliefs, and cultural expressions. The museum's unique architecture includes a spiral ramp connecting all levels, culminating in a Sky Walk that offers panoramic views of Shillong. Interactive displays and life-size models enhance the visitor experience, making complex cultural traditions accessible. The museum also houses an extensive photo archive and research library containing rare manuscripts and publications on northeastern tribal cultures. The final gallery hosts rotating exhibitions of contemporary indigenous art, highlighting how traditional cultures continue to evolve in modern contexts.",
        "price": 100,
        "rating": 4.6,
        "exhibitCount": "4,500+",
        "contact": "meghalayatourism.org.in | 022 4561 2398",
        "reviews": [
            { "name": "Daniel Syiem", "rating": 5, "date": "February 25, 2025", "comment": "An incredible cultural repository! The detailed exhibits on Khasi, Garo, and Jaintia tribes were particularly meaningful to me as a local." },
            { "name": "Amanda Johnson", "rating": 5, "date": "February 10, 2025", "comment": "One of the most comprehensive ethnographic museums I've visited anywhere in the world. The spiral layout makes for an engaging experience." },
            { "name": "Baiakmenlang Kharmawphlang", "rating": 4, "date": "January 22, 2025", "comment": "A must-visit to understand Northeast India's diversity. The traditional housing reproductions were especially well done." },
            { "name": "Praveen Kumar", "rating": 5, "date": "January 8, 2025", "comment": "Spent three hours here and felt I could have stayed longer. The musical instruments gallery was fascinating." },
            { "name": "Sarah Williams", "rating": 4, "date": "December 15, 2024", "comment": "Excellent museum with informative displays. The Sky Walk offers breathtaking views of Shillong!" },
            { "name": "Wanphai Nongrum", "rating": 5, "date": "November 28, 2024", "comment": "A treasure trove of northeastern heritage. The handicrafts section showcases incredible artisanship." },
            { "name": "Michael Chen", "rating": 4, "date": "November 5, 2024", "comment": "As an anthropologist, I was impressed by the depth of information. Some labels could be updated, but overall an outstanding collection." }
        ]
    },
    {
        "id": 17,
        "title": "Mizoram State Museum",
        "state": "Mizoram",
        "location": "Aizawl",
        "address": "MacDonald Hill, Near Raj Bhavan,\nAizawl, Mizoram 796001",
        "subtitle": "Museum showcasing Mizo tribal culture through textiles, weapons & handicrafts across generations.",
        "image": "https://media.istockphoto.com/id/1323055401/photo/view-of-aizwal-city-just-before-the-sunset.jpg?s=2048x2048&w=is&k=20&c=j9H-iv-hdJiQePo9mOJw-A_QXg_v-l2jwLSsi2LvUpg=",
        "gallery": [
            "https://media.istockphoto.com/id/1323055401/photo/view-of-aizwal-city-just-before-the-sunset.jpg?s=2048x2048&w=is&k=20&c=j9H-iv-hdJiQePo9mOJw-A_QXg_v-l2jwLSsi2LvUpg=", 
            "https://media.istockphoto.com/id/1203497077/photo/jungle-track.jpg?s=2048x2048&w=is&k=20&c=HoqLXG9nfNSMRqizetEatilEHuBftxVLOHyzycbUON0=", 
            "https://media.istockphoto.com/id/1182117543/photo/paddy-field-with-ruined-farm-house.jpg?s=2048x2048&w=is&k=20&c=d3ZHa5DPAFlmyzGfjmWtB6-bMsYXeyfXzvDMs7ndLDE="
        ],
        "description": "The Mizoram State Museum, established in 1977, serves as a vital cultural repository celebrating the rich heritage of the Mizo people and other indigenous communities of this northeastern state. Located on MacDonald Hill in Aizawl, the museum offers visitors a comprehensive exploration of Mizo history, traditions, and artistic expressions. The museum is organized across multiple galleries that showcase traditional costumes, intricate textiles featuring unique tribal motifs, ceremonial masks, hunting equipment, and war implements that reflect the region's warrior history. Particularly noteworthy is the collection of 'Puanchei' and 'Puan Ri' textiles, known for their vibrant patterns and cultural significance in Mizo society. The ethnographic section features detailed recreations of traditional Mizo homes, including authentic bamboo implements and household objects that offer insights into rural lifestyles. Historical galleries document the region's transformation from British colonial rule through missionary influence to statehood, with photographs and documents from key periods. The museum also houses a remarkable collection of traditional musical instruments, including the 'Darbu' (drum), 'Hnahtum' (gong), and 'Rawchhem' (wind instrument), which play central roles in Mizo cultural ceremonies and dances.",
        "price": 100,
        "rating": 4.1,
        "exhibitCount": "280+",
        "contact": "mizoramtourism.org.in | 022 4732 5891",
        "reviews": [
            { "name": "Lalrinmawia Ralte", "rating": 5, "date": "February 18, 2025", "comment": "As a Mizo, I was deeply moved by the careful preservation of our cultural heritage. The textile collection is particularly impressive." },
            { "name": "Sarah Johnson", "rating": 4, "date": "February 5, 2025", "comment": "A fascinating glimpse into a culture not widely known outside Northeast India. The bamboo craft section was extraordinary." },
            { "name": "Lalthanzuala Sailo", "rating": 5, "date": "January 12, 2025", "comment": "The museum does an excellent job of documenting our traditional practices. The historical photographs section was particularly moving." },
            { "name": "Rajiv Sharma", "rating": 3, "date": "December 30, 2024", "comment": "Interesting collections, though the building could use better climate control. The weapons display was impressive." },
            { "name": "Hmingthanzuali", "rating": 4, "date": "November 25, 2024", "comment": "A must-visit to understand Mizoram's cultural identity. The traditional house model shows exactly how our ancestors lived." },
            { "name": "David Thompson", "rating": 4, "date": "October 20, 2024", "comment": "As an anthropologist, I found the ethnographic displays wonderfully detailed and contextual. The musical instruments section was a highlight." }
        ]
    },
    {
        "id": 18,
        "title": "Nagaland State Museum",
        "state": "Nagaland",
        "location": "Kohima",
        "address": "Bayavu Hill, Near Raj Bhavan,\nKohima, Nagaland 797001",
        "subtitle": "Museum showcasing Naga tribal heritage with traditional artifacts, weapons & cultural treasures.",
        "image": "https://media.istockphoto.com/id/2150315228/photo/aerial-view-of-kv-paradise-in-aizawl-the-capital-city-of-mizoram-this-architectural.jpg?s=2048x2048&w=is&k=20&c=97_iyXz68jZNiVZJXshNQfeSMhiJp8myhz4cvVRxUwQ=",
        "gallery": [
            "https://media.istockphoto.com/id/2150315228/photo/aerial-view-of-kv-paradise-in-aizawl-the-capital-city-of-mizoram-this-architectural.jpg?s=2048x2048&w=is&k=20&c=97_iyXz68jZNiVZJXshNQfeSMhiJp8myhz4cvVRxUwQ=", 
            "https://media.istockphoto.com/id/1474595539/photo/beautiful-landscape-of-terraced-rice-fields-in-nagaland.jpg?s=2048x2048&w=is&k=20&c=cT8JT38Ih1wzwL1w9yPkTc9fOz44Oca-CoqapZylEFk=", 
            "https://media.istockphoto.com/id/897229558/photo/dzukou-valley-nagaland-north-east-india.jpg?s=2048x2048&w=is&k=20&c=33NjYzakLwgq5U-aRFCKwznWZuReJgSCnI4duBZ8bz8="
        ],
        "description": "The Nagaland State Museum, established in 1970, stands as a cultural cornerstone preserving the rich heritage of the region's diverse tribal communities. Located in Kohima, the museum offers visitors an immersive journey into the unique traditions of all 16 major Naga tribes. The museum houses an exceptional collection of tribal artifacts, including ceremonial headdresses adorned with hornbill feathers, intricately carved wooden statues, and symbolic log drums that once served as community communication devices. The weaponry section displays traditional dao swords, spears, and shields that reflect the warrior tradition central to Naga identity. Visitors can marvel at vibrant traditional textiles featuring tribe-specific patterns and motifs, each telling stories of clan identity and social status. The museum's ethnographic galleries include detailed recreations of traditional Naga morung (youth dormitories) and homes with authentic artifacts arranged in cultural context. Historical exhibits document the region's complex journey from British colonial contact through the World War II Japanese invasion to statehood within India. A dedicated gallery showcases the spiritual beliefs and practices of Naga communities, including items used in traditional animist ceremonies alongside artifacts reflecting the region's later adoption of Christianity.",
        "price": 110,
        "rating": 4.4,
        "exhibitCount": "380+",
        "contact": "nagalandtourism.org.in | 022 4675 3429",
        "reviews": [
            { "name": "Kevichusa Angami", "rating": 5, "date": "February 23, 2025", "comment": "A treasure house of our cultural heritage. The distinct artifacts from all 16 tribes are wonderfully displayed and explained." },
            { "name": "Melissa Chen", "rating": 4, "date": "February 8, 2025", "comment": "Fascinating insight into the unique tribal cultures of Nagaland. The headdress collection is particularly impressive." },
            { "name": "Imkong Ao", "rating": 5, "date": "January 25, 2025", "comment": "The museum does justice to our rich tribal heritage. I especially appreciated the section on traditional woodcarvings." },
            { "name": "Rajat Gupta", "rating": 4, "date": "January 10, 2025", "comment": "A must-visit to understand Northeast Indian tribal culture. The textiles section displays remarkable craftsmanship." },
            { "name": "Alemtemshi Jamir", "rating": 5, "date": "December 18, 2024", "comment": "As someone from the Ao tribe, I was deeply moved by how accurately our traditions are represented. The log drum exhibits are spectacular." },
            { "name": "Sarah Williams", "rating": 4, "date": "November 27, 2024", "comment": "The museum offers excellent context about Naga history and cultural practices. The WWII section was unexpectedly informative." },
            { "name": "Niketu Iralu", "rating": 3, "date": "November 5, 2024", "comment": "Important cultural institution though some exhibits could use renovation. The traditional weapons collection is outstanding." },
            { "name": "Michelle Parker", "rating": 5, "date": "October 12, 2024", "comment": "As an anthropologist, I found this museum exceptionally well-curated, providing deep insights into Naga cultural identity and traditions." }
        ]
    },
    {
        "id": 19,
        "title": "Odisha State Museum",
        "state": "Odisha",
        "location": "Bhubaneswar",
        "address": "Lewis Road, Near Kalpana Square,\nBhubaneswar, Odisha 751002",
        "subtitle": "Museum featuring Odisha's cultural artifacts, sculptures & tribal heritage spanning centuries.",
        "image": "https://media.istockphoto.com/id/1207173071/photo/ancient-indian-architecture-konark-sun-temple-in-odisha-india.jpg?s=2048x2048&w=is&k=20&c=FeVOcIxpStyjbnJhND7hsfl_k_IV45ubbUSsMoGdaKs=",
        "gallery": [
            "https://media.istockphoto.com/id/1207173071/photo/ancient-indian-architecture-konark-sun-temple-in-odisha-india.jpg?s=2048x2048&w=is&k=20&c=FeVOcIxpStyjbnJhND7hsfl_k_IV45ubbUSsMoGdaKs=", 
            "https://media.istockphoto.com/id/1355270182/photo/long-view-of-udaygiri-caves-from-khandagiri-caves-bhubaneswar-odisha-india.jpg?s=2048x2048&w=is&k=20&c=0DUY36x-6vGHwz-bK0_8cMDL960idmklIL--nECyAxU=", 
            "https://media.istockphoto.com/id/96668487/photo/ancient-hindu-sun-temple-at-konark.jpg?s=2048x2048&w=is&k=20&c=3f9kC2t5ldgpFUe08sgTEiUruLfe5mmcK9hUKVrommc="
        ],
        "description": "The Odisha State Museum, established in 1932 and relocated to its current premises in 1960, stands as a premier cultural institution showcasing the rich artistic and historical legacy of this eastern Indian state. Located in Bhubaneswar, the museum houses an exceptional collection spanning archaeology, numismatics, epigraphy, paintings, and ethnography. Visitors can marvel at rare palm leaf manuscripts with intricate illustrations, some dating back to the 12th century. The archaeological section displays magnificent stone sculptures from the region's temple-building traditions, including masterpieces from the famous Sun Temple at Konark and other architectural marvels of the Kalinga style. The museum is renowned for its extensive collection of Buddhist antiquities, including rare sculptures from Ratnagiri, Udayagiri, and Lalitgiri that highlight Odisha's significant role in Buddhist history. The natural history wing features fossils, including a 65-million-year-old dinosaur egg. The ethnographic gallery presents a comprehensive display of arts, crafts, and everyday objects from Odisha's 62 tribal communities, with particular focus on the Dongria Kondh, Santhal, and Bonda tribes. The traditional painting section showcases the evolution of Pattachitra, Odisha's distinctive scroll painting tradition, alongside contemporary works reflecting the region's artistic continuity.",
        "price": 120,
        "rating": 4.5,
        "exhibitCount": "520+",
        "contact": "odishatourism.org.in | 022 4587 2146",
        "reviews": [
            { "name": "Debasis Mohanty", "rating": 5, "date": "February 26, 2025", "comment": "A world-class collection of Odishan artifacts. The palm leaf manuscript gallery is a national treasure." },
            { "name": "Sujata Patnaik", "rating": 4, "date": "February 12, 2025", "comment": "The temple sculpture collection is breathtaking - pieces from Konark and Puri provide insights into our architectural heritage." },
            { "name": "Michael Robertson", "rating": 5, "date": "January 30, 2025", "comment": "As an art historian, I was particularly impressed by the Buddhist sculpture gallery. Some pieces rival anything in national museums." },
            { "name": "Ananya Tripathy", "rating": 4, "date": "January 15, 2025", "comment": "The tribal arts section offers fascinating glimpses into Odisha's indigenous cultures. The traditional jewelry collection is outstanding." },
            { "name": "Prasanna Kumar", "rating": 5, "date": "December 22, 2024", "comment": "A comprehensive showcase of Odishan culture and history. The Pattachitra gallery explains the evolution of this unique art form beautifully." },
            { "name": "Lisa Chen", "rating": 4, "date": "December 5, 2024", "comment": "Well-curated exhibits with good English descriptions. The archaeological collection is world-class." },
            { "name": "Bijay Mishra", "rating": 5, "date": "November 18, 2024", "comment": "As someone who studies Odishan history, I can attest to the museum's academic value. The manuscript collection is particularly significant." }
        ]
    },
    {
        "id": 20,
        "title": "Maharaja Ranjit Singh Museum",
        "state": "Punjab",
        "location": "Ludhiana",
        "address": "Maharaja Ranjit Singh War Memorial, Bharat Nagar,\nFerozepur Road, Ludhiana, Punjab 141001",
        "subtitle": "Military museum with war artifacts & Punjab's defense history exhibits honoring the Lion of Punjab.",
        "image": "https://media.istockphoto.com/id/1273273094/photo/khalsa-college-is-a-historic-educational-institution-in-the-northern-indian-city-of-amritsar.jpg?s=2048x2048&w=is&k=20&c=hOz6laI1Sq4k3RhlW6ZUgDtTW7wm8LkEpYsr9d_FE0s=",
        "gallery": [
            "https://media.istockphoto.com/id/1273273094/photo/khalsa-college-is-a-historic-educational-institution-in-the-northern-indian-city-of-amritsar.jpg?s=2048x2048&w=is&k=20&c=hOz6laI1Sq4k3RhlW6ZUgDtTW7wm8LkEpYsr9d_FE0s=", 
            "https://media.istockphoto.com/id/535570117/photo/golden-temple-in-amritsar-punjab-india.jpg?s=2048x2048&w=is&k=20&c=OM4d72Yq8eEGPWOFfeR8usPcGu7eOsn71i9H7pZtXoo=", 
            "https://media.istockphoto.com/id/1835605101/photo/wheat-and-mustard-field-in-the-village.jpg?s=2048x2048&w=is&k=20&c=rh0WJOhKpRVvBiCXFLAIAZgtDw5Ve65GJlA8SJjSaBw="
        ],
        "description": "The Maharaja Ranjit Singh Museum, established in 1999, stands as a tribute to the legendary 'Lion of Punjab' who forged the powerful Sikh Empire in the early 19th century. Located in Ludhiana, this specialized military museum offers visitors a comprehensive exploration of Punjab's martial traditions and the significant contributions of Punjabi soldiers throughout history. The museum houses an impressive collection of weapons, including rare swords, firearms, and artillery pieces from the Sikh Empire period. Military uniforms, medals, and decorations showcase the valor of Punjabi regiments that served in various conflicts, from the World Wars to post-independence operations. Historical galleries chronicle Maharaja Ranjit Singh's military campaigns and administrative innovations that unified Punjab. The museum features detailed dioramas and models recreating famous battles, including those fought against British and Afghan forces. A special section is dedicated to the Anglo-Sikh Wars, with maps, documents, and artifacts illuminating this critical period in Punjab's history. Modern exhibits highlight the continuing legacy of Punjab in India's armed forces, with tributes to Param Vir Chakra recipients and other decorated soldiers from the state. Outside the main building, visitors can explore decommissioned military vehicles, aircraft, and artillery pieces arranged in a park-like setting that serves as both educational display and memorial.",
        "price": 150,
        "rating": 4.6,
        "exhibitCount": "420+",
        "contact": "punjabtourism.org.in | 022 4965 7823",
        "reviews": [
            { "name": "Harpreet Singh", "rating": 5, "date": "February 28, 2025", "comment": "A moving tribute to Punjab's military heritage. The section on Maharaja Ranjit Singh's strategic brilliance was particularly insightful." },
            { "name": "Gurjeet Kaur", "rating": 5, "date": "February 14, 2025", "comment": "The museum does an excellent job documenting our martial traditions. The collection of Sikh weaponry is unparalleled." },
            { "name": "Rajinder Pal", "rating": 4, "date": "January 27, 2025", "comment": "As a veteran, I appreciated the detailed exhibits on regimental histories. The outdoor display of tanks and artillery is impressive." },
            { "name": "Michael Thompson", "rating": 5, "date": "January 10, 2025", "comment": "As a military historian, I found this museum remarkably comprehensive. The Anglo-Sikh War exhibits provide excellent historical context." },
            { "name": "Simran Gill", "rating": 4, "date": "December 20, 2024", "comment": "Beautifully maintained museum that honors our warriors. The interactive battle maps were educational and engaging." },
            { "name": "Amarjit Singh", "rating": 5, "date": "December 2, 2024", "comment": "The museum captures the spirit of Punjab's warrior tradition. The exhibition on Punjabi Victoria Cross recipients was particularly moving." },
            { "name": "Ajit Sandhu", "rating": 4, "date": "November 15, 2024", "comment": "A must-visit for understanding Punjab's military contributions. The replica of Maharaja Ranjit Singh's court is impressive." },
            { "name": "Sarah Wilson", "rating": 5, "date": "October 30, 2024", "comment": "Exceptional curation of military artifacts. The exhibits on modern warfare and Punjab's continuing military tradition bring the story full circle." }
        ]
    },
    {
        "id": 21,
        "title": "Albert Hall Museum",
        "state": "Rajasthan",
        "location": "Jaipur",
        "address": "Museum Road, Ram Niwas Garden,\nJaipur, Rajasthan 302004",
        "subtitle": "Oldest Rajasthan museum with art, artifacts & historical exhibits in a stunning Indo-Saracenic building.",
        "image": "https://media.istockphoto.com/id/509612306/photo/kumbhalgarh-fort-india.jpg?s=2048x2048&w=is&k=20&c=pFYqGbZxZBZds1mUubiceiB3S_QBraRyThTX41KCTwU=",
        "gallery": [
            "https://media.istockphoto.com/id/509612306/photo/kumbhalgarh-fort-india.jpg?s=2048x2048&w=is&k=20&c=pFYqGbZxZBZds1mUubiceiB3S_QBraRyThTX41KCTwU=", 
            "https://media.istockphoto.com/id/1026502014/photo/chand-baori-the-most-famous-stair-well-in-india.jpg?s=2048x2048&w=is&k=20&c=tFrynM4LcMwGnRBaSMjpxhaU9p4NQnssx3BrrrlHT1U=", 
            "https://media.istockphoto.com/id/510978989/photo/hawa-mahal-palace-in-jaipur-rajasthan.jpg?s=2048x2048&w=is&k=20&c=oG2atHhEjdHVyEn9Hq9wU8j8CIOa0dRlDBahr-J7BsU="
        ],
        "description": "The Albert Hall Museum, established in 1887, is the oldest museum in Rajasthan and a striking example of Indo-Saracenic architecture designed by Sir Samuel Swinton Jacob. Located in the historic pink city of Jaipur, this landmark institution was named after King Edward VII (Albert Edward), then Prince of Wales, who laid its foundation stone during his visit to India. The museum houses an extraordinary collection spanning diverse fields including archaeology, metalwork, decorative arts, paintings, sculptures, and textiles. Visitors can explore galleries dedicated to Rajasthani folk art, featuring vibrant Rajput miniature paintings and traditional crafts that showcase the region's artistic heritage. The Egyptian gallery is particularly notable, containing a rare mummy dating back to the Ptolemaic period, gifted to the museum in 1896. The arms and armor section displays elaborately decorated weapons that belonged to Rajput warriors, while the carpet gallery features exquisite specimens from across Asia. The natural history section includes preserved specimens of regional flora and fauna. The building itself is a masterpiece, with colorful murals adorning its domed ceilings, ornate archways, and intricate marble floors that reflect Rajasthan's architectural splendor. At night, the museum's façade is illuminated, creating one of Jaipur's most photogenic landmarks.",
        "price": 140,
        "rating": 4.7,
        "exhibitCount": "600+",
        "contact": "rajasthantourism.org.in | 022 4869 3451",
        "reviews": [
            { "name": "Vikram Singh", "rating": 5, "date": "February 27, 2025", "comment": "The building itself is a work of art! The Rajput miniature painting collection is extraordinary and beautifully presented." },
            { "name": "Priya Sharma", "rating": 5, "date": "February 15, 2025", "comment": "One of Jaipur's must-visit attractions. The Egyptian mummy was unexpected and fascinating. The nighttime illumination is spectacular." },
            { "name": "David Wilson", "rating": 4, "date": "January 30, 2025", "comment": "As an architectural historian, I was impressed by the Indo-Saracenic details. The textile collection is world-class." },
            { "name": "Anisha Agarwal", "rating": 5, "date": "January 12, 2025", "comment": "A gem that showcases Rajasthan's cultural richness. The traditional craft displays provide wonderful context for understanding local artisanship." },
            { "name": "James Thompson", "rating": 4, "date": "December 28, 2024", "comment": "Excellent museum with diverse collections. The arms and armor gallery was particularly impressive." },
            { "name": "Lakshmi Rathore", "rating": 5, "date": "December 10, 2024", "comment": "The Persian carpet collection is breathtaking. Spending an afternoon here gives you a comprehensive understanding of Rajasthani heritage." },
            { "name": "Maria Gonzalez", "rating": 5, "date": "November 25, 2024", "comment": "The building's architecture is as impressive as the collections inside. The pottery and ceramic exhibits were highlights for me." },
            { "name": "Rajeev Mehta", "rating": 4, "date": "November 5, 2024", "comment": "Well-maintained museum with excellent signage in multiple languages. The marble work and inlay craft displays are outstanding." }
        ]
    },
    {
        "id": 22,
        "title": "Namgyal Institute of Tibetology",
        "state": "Sikkim",
        "location": "Gangtok",
        "address": "Deorali, Near Enchey Monastery,\nGangtok, Sikkim 737101",
        "subtitle": "Museum showcasing Tibetan Buddhist culture with rare manuscripts, thangkas, and sacred art pieces.",
        "image": "https://media.istockphoto.com/id/687689872/photo/buddha-park-rabangla-sikkim.jpg?s=2048x2048&w=is&k=20&c=6S4uL6xO-ZF2DWlpDKtOt8AVKVesTSyXc2TB4ymM3CQ=",
        "gallery": [
            "https://media.istockphoto.com/id/687689872/photo/buddha-park-rabangla-sikkim.jpg?s=2048x2048&w=is&k=20&c=6S4uL6xO-ZF2DWlpDKtOt8AVKVesTSyXc2TB4ymM3CQ=", 
            "https://media.istockphoto.com/id/1003583336/photo/semi-frozen-gurudongmar-lake-of-sikkim-india.jpg?s=2048x2048&w=is&k=20&c=3SGx-twI5buHE7C-ikQESlaXhGHzF3tsOihkiDJLexs=", 
            "https://media.istockphoto.com/id/180750038/photo/gate-to-the-temple.jpg?s=2048x2048&w=is&k=20&c=nCxPTixkIi-aaL47k5d2mb79HajRwmLr_Ua-0melcIw="
        ],
        "description": "The Namgyal Institute of Tibetology, established in 1958, stands as a premier center for the study and preservation of Tibetan Buddhist culture and heritage in the Himalayan region. Located in Gangtok amid serene forested surroundings, this distinctive Tibetan-style building houses one of the world's most significant collections of Tibetan artifacts outside Tibet. The museum showcases over 200 Buddhist icons and rare thangka scroll paintings, many dating back several centuries and depicting elaborate mandalas, deities, and philosophical concepts central to Tibetan Buddhism. The library contains more than 60,000 rare manuscripts and texts in Tibetan, Sanskrit, and other languages, including complete sets of the Kangyur and Tengyur (Buddhist canonical texts). Visitors can marvel at an extraordinary collection of ritual objects, including ceremonial masks used in sacred cham dances, musical instruments, and intricately designed butter sculpture molds. The institute houses a remarkable collection of ancient coins, seals, and philatelic items that document the region's political and cultural history. A highlight is the display of rare statues crafted from precious metals, some containing sacred relics. The surrounding complex includes a garden featuring indigenous Himalayan plants and traditional prayer wheels, creating a peaceful atmosphere that complements the scholarly environment. As both a museum and research center, the institute regularly hosts scholars from around the world studying Buddhist philosophy, Himalayan culture, and Tibetan medicine.",
        "price": 120,
        "rating": 4.8,
        "exhibitCount": "300+",
        "contact": "sikkimtourism.org.in | 022 4756 9821",
        "reviews": [
            { "name": "Tenzin Wangchuk", "rating": 5, "date": "February 24, 2025", "comment": "An extraordinary repository of Tibetan culture. The manuscript collection is unparalleled and the thangkas are breathtaking." },
            { "name": "Emily Richardson", "rating": 5, "date": "February 9, 2025", "comment": "As a Buddhist studies scholar, I found this institute remarkable. The depth of the collection and the peaceful setting create an ideal environment for research and appreciation." },
            { "name": "Pema Dorjee", "rating": 5, "date": "January 20, 2025", "comment": "The institute does an excellent job preserving our cultural heritage. The ritual mask collection is particularly significant and well-displayed." },
            { "name": "Sonam Gyatso", "rating": 4, "date": "January 5, 2025", "comment": "A treasure trove of Himalayan Buddhist artifacts. The library collection alone makes this place globally significant." },
            { "name": "Maya Sharma", "rating": 5, "date": "December 18, 2024", "comment": "Beyond being a museum, this is a living research center. The ancient medical texts and thangkas depicting the Tibetan medical system were fascinating." },
            { "name": "Richard Thompson", "rating": 5, "date": "December 3, 2024", "comment": "The building itself is architecturally significant, and the collections inside are world-class. The staff are knowledgeable and passionate." },
            { "name": "Karma Bhutia", "rating": 4, "date": "November 15, 2024", "comment": "As a local, I'm proud of this institution that preserves our regional heritage. The ancient manuscripts section is particularly impressive." }
        ]
    },
    {
        "id": 23,
        "title": "Government Museum, Chennai",
        "state": "Tamil Nadu",
        "location": "Chennai",
        "address": "Pantheon Road, Egmore,\nChennai, Tamil Nadu 600008",
        "subtitle": "Historic museum with ancient sculptures, coins & natural history displays from South India.",
        "image": "https://media.istockphoto.com/id/1170478057/photo/rajarajan-tiruvasal-and-protecting-wall-brihadisvara-temple-tanjore-tamil-nadu-india-vew-from.jpg?s=2048x2048&w=is&k=20&c=YTgqLD5ktIMbtvRDYKE6mHFexGggHhqLtWpU6ZeoP40=",
        "gallery": [
            "https://media.istockphoto.com/id/1170478057/photo/rajarajan-tiruvasal-and-protecting-wall-brihadisvara-temple-tanjore-tamil-nadu-india-vew-from.jpg?s=2048x2048&w=is&k=20&c=YTgqLD5ktIMbtvRDYKE6mHFexGggHhqLtWpU6ZeoP40=", 
            "https://media.istockphoto.com/id/1173055476/photo/sri-ranganatha-swamy-temple-in-trichy.jpg?s=2048x2048&w=is&k=20&c=XRnVR7FffmIL_T3CwB1U-SLRPjqhgJHRupbT0NyIyKg=", 
            "https://media.istockphoto.com/id/1323840909/photo/chettinadu-palace-heritage-site.jpg?s=2048x2048&w=is&k=20&c=44B8JereE6RErU6tGbPhYGexD5D4WBSkRR6MHGvv2UY="
        ],
        "description": "The Government Museum, Chennai, established in 1851, is one of India's oldest and most prestigious museums, situated within a stunning Indo-Saracenic complex in the heart of the city. This comprehensive cultural institution spans multiple buildings across a 16-acre campus, housing over 50,000 artifacts divided into distinct galleries. The archaeology section showcases an exceptional collection of South Indian sculptures, including masterpieces from the Chola, Pallava, and Vijayanagara periods, with the bronze gallery featuring world-renowned Nataraja figures and other exquisite metal castings. The numismatic collection includes rare coins from various South Indian dynasties, Roman copper coins discovered in the region, and gold fanams that trace the economic history of the Deccan. Natural history enthusiasts can explore galleries featuring prehistoric fossils, including a 200-million-year-old dinosaur skeleton discovered in Tamil Nadu, alongside zoological specimens representing the region's biodiversity. The museum complex also houses the National Art Gallery with its collection of Tanjore paintings, miniatures, and modern Indian art. A unique highlight is the anthropology section featuring artifacts from indigenous communities of South India, including the Todas and Irulas. Adjacent to the main museum is the Children's Museum and the Government Museum Theatre, a beautiful 19th-century structure that continues to host cultural performances, making this complex a comprehensive cultural center that bridges historical artifacts with living traditions.",
        "price": 175,
        "rating": 4.6,
        "exhibitCount": "50,000+",
        "contact": "tamilnadutourism.org.in | 022 4895 7362",
        "reviews": [
            { "name": "Venkatesh Iyer", "rating": 5, "date": "February 26, 2025", "comment": "The bronze gallery alone is worth the visit - some of the finest Chola period Nataraja sculptures in existence are displayed here." },
            { "name": "Lakshmi Subramaniam", "rating": 5, "date": "February 10, 2025", "comment": "As an art historian, I consider this among India's finest museums. The sculpture collection traces the evolution of Dravidian art beautifully." },
            { "name": "James Wilson", "rating": 4, "date": "January 25, 2025", "comment": "Impressive range of exhibits spanning archaeology to natural history. The coin gallery provides fascinating insights into ancient trade networks." },
            { "name": "Priya Ramachandran", "rating": 5, "date": "January 8, 2025", "comment": "The museum complex itself is architecturally significant. The anthropology section offers valuable perspectives on South India's indigenous cultures." },
            { "name": "Anand Rajagopal", "rating": 4, "date": "December 22, 2024", "comment": "The paleontology section with local dinosaur fossils was unexpected and fascinating. Some exhibits could use updated lighting." },
            { "name": "Sarah Thompson", "rating": 5, "date": "December 5, 2024", "comment": "One of South Asia's finest museums. The bronze Nataraja collection is world-class and beautifully displayed with proper context." },
            { "name": "Karthik Sundaram", "rating": 4, "date": "November 18, 2024", "comment": "A treasure trove of South Indian heritage. The museum theatre is a beautiful colonial-era building worth seeing in its own right." },
            { "name": "Michelle Parker", "rating": 5, "date": "October 30, 2024", "comment": "Spent hours exploring the varied collections. The Tanjore painting gallery offers wonderful insights into this unique art form." }
        ]
    },
    {
        "id": 24,
        "title": "Salar Jung Museum",
        "state": "Telangana",
        "location": "Hyderabad",
        "address": "Salar Jung Road, Darulshifa,\nHyderabad, Telangana 500002",
        "subtitle": "World-renowned museum housing one of the largest single-person collections of antiques and art.",
        "image": "https://media.istockphoto.com/id/1442120245/photo/beautiful-shot-of-the-high-court-for-the-state-of-telangana-with-surrounding-trees-in-india.jpg?s=2048x2048&w=is&k=20&c=1Dub0Bb-7wQK02Pz8oJpPSVjHE-Si-yqMRK02Ae0gJw=",
        "gallery": [
            "https://media.istockphoto.com/id/1442120245/photo/beautiful-shot-of-the-high-court-for-the-state-of-telangana-with-surrounding-trees-in-india.jpg?s=2048x2048&w=is&k=20&c=1Dub0Bb-7wQK02Pz8oJpPSVjHE-Si-yqMRK02Ae0gJw=", 
            "https://media.istockphoto.com/id/614973596/photo/golconda-fort-area.jpg?s=2048x2048&w=is&k=20&c=Widp1QyFdcBV4SkKTf599pwwOxCpsOOCpFzotIrZFWw=", 
            "https://media.istockphoto.com/id/1209304543/photo/warangal.jpg?s=2048x2048&w=is&k=20&c=IaBmrm5ErieZYpNPvf9m0wWywOItMphzSc6LJWrPIcc="
        ],
        "description": "The Salar Jung Museum in Hyderabad houses one of the world's largest personal art collections, amassed by Nawab Salar Jung III. This prestigious institution features over 43,000 art objects, 9,000 manuscripts, and 47,000 printed books, with exhibits ranging from the 1st century to the early 20th century. Visitors can explore artifacts from various civilizations including Indian, Middle Eastern, European, and Far Eastern. Notable attractions include the Veiled Rebecca sculpture, the double-figured wooden block representing both Mephistopheles and Margaretta, and the famous musical clock. The museum's extensive collection spans paintings, textiles, metallic artifacts, ivory carvings, manuscripts, ceramics, and furniture, offering a fascinating glimpse into global art history and cultural heritage.",
        "price": 150,
        "rating": 4.7,
        "exhibitCount": "43,000+",
        "contact": "telanganatourism.org.in | 022 4362 8971",
        "reviews": [
          { "name": "Rajesh Kumar", "rating": 5, "date": "February 28, 2025", "comment": "An absolute treasure trove of art and artifacts. The Veiled Rebecca is breathtaking in person!" },
          { "name": "Priya Verma", "rating": 5, "date": "February 15, 2025", "comment": "Spent an entire day here and still didn't see everything. The musical clock demonstration is a must-see." },
          { "name": "Thomas Wilson", "rating": 4, "date": "January 30, 2025", "comment": "Incredible collection with pieces from around the world. The European gallery was particularly impressive." },
          { "name": "Sarika Patel", "rating": 5, "date": "January 12, 2025", "comment": "One of the best museums in India. Well-maintained and the artifacts are displayed beautifully." },
          { "name": "Ahmed Khan", "rating": 4, "date": "December 25, 2024", "comment": "The manuscript collection is unparalleled. Would recommend getting an audio guide to fully appreciate the exhibits." },
          { "name": "Meera Reddy", "rating": 5, "date": "November 5, 2024", "comment": "The double statue of Mephistopheles and Margaretta left me speechless. Worth every rupee of the entry fee!" }
        ]
    },
    {
        "id": 25,
        "title": "Tripura State Museum",
        "state": "Tripura",
        "location": "Agartala",
        "address": "Palace Compound, Ujjayanta Palace,\nAgartala, Tripura 799001",
        "subtitle": "Historic royal palace converted into museum showcasing Tripura's rich cultural heritage.",
        "image": "https://media.istockphoto.com/id/1292258588/photo/udaipur-in-tripura-india.jpg?s=2048x2048&w=is&k=20&c=TnLel2NeaHDitmy7U2plPzuEp702vgfClyczJZ3NxpY=",
        "gallery": [
            "https://media.istockphoto.com/id/1292258588/photo/udaipur-in-tripura-india.jpg?s=2048x2048&w=is&k=20&c=TnLel2NeaHDitmy7U2plPzuEp702vgfClyczJZ3NxpY=", 
            "https://media.istockphoto.com/id/1291425997/photo/unakoti-in-tripura-india.jpg?s=2048x2048&w=is&k=20&c=1o_V8LxwKBS22lWCvIi0y-ymC8zZyfPQDxUvVDljL7g=", 
            "https://media.istockphoto.com/id/1490045800/photo/stone-carving-in-chabimura.jpg?s=2048x2048&w=is&k=20&c=lIHlKacj16TZwGzjaMx-n6zbwSmkNDZ5DVn1dqVukUo="
        ],
        "description": "The Tripura State Museum, housed in the magnificent Ujjayanta Palace in Agartala, offers visitors a glimpse into the rich cultural heritage of this northeastern state. Built in 1901 by Maharaja Radha Kishore Manikya, this former royal residence was converted into a museum in 2013. The museum's extensive collection is spread across multiple galleries featuring archaeological artifacts, royal memorabilia, traditional handicrafts, and tribal cultural exhibits. Visitors can explore ancient sculptures, coins, paintings, textiles, and musical instruments that showcase the unique blend of Bengali and indigenous tribal influences that define Tripura's cultural identity. The museum's architecture itself is a remarkable example of Indo-Saracenic style, with its domed towers, ornate pillars, and meticulously maintained gardens adding to the historical ambiance of the experience.",
        "price": 120,
        "rating": 4.2,
        "exhibitCount": "1,600+",
        "contact": "tripuratourism.org.in | 022 3687 5249",
        "reviews": [
          { "name": "Debashish Roy", "rating": 5, "date": "February 20, 2025", "comment": "Beautiful palace with excellent displays of tribal artifacts. The building itself is worth the visit!" },
          { "name": "Maitreyi Dutta", "rating": 4, "date": "January 22, 2025", "comment": "Fascinating collection that showcases the rich history of Tripura. The royal gallery was particularly impressive." },
          { "name": "Robert Chen", "rating": 3, "date": "December 15, 2024", "comment": "Interesting exhibits but some sections could use better labeling and explanation in English." },
          { "name": "Pranab Barua", "rating": 5, "date": "November 28, 2024", "comment": "A must-visit to understand Tripura's cultural diversity. The tribal art section is exceptional." },
          { "name": "Sanjana Deb", "rating": 4, "date": "November 2, 2024", "comment": "The palace architecture is stunning and the gardens are well-maintained. Great place for history enthusiasts." }
        ]
    },
    {
        "id": 26,
        "title": "State Museum, Lucknow",
        "state": "Uttar Pradesh",
        "location": "Lucknow",
        "address": "Banarsi Bagh, near Residency Road,\nLucknow, Uttar Pradesh 226001",
        "subtitle": "Comprehensive museum showcasing Uttar Pradesh's rich cultural and historical heritage.",
        "image": "https://media.istockphoto.com/id/493916125/photo/the-city-and-ghats-of-varanasi.jpg?s=2048x2048&w=is&k=20&c=7bMj4thEhvjqFjBSSzRVj03gu1NdwfCUqPqpYIt7RAA=",
        "gallery": [
            "https://media.istockphoto.com/id/493916125/photo/the-city-and-ghats-of-varanasi.jpg?s=2048x2048&w=is&k=20&c=7bMj4thEhvjqFjBSSzRVj03gu1NdwfCUqPqpYIt7RAA=", 
            "https://media.istockphoto.com/id/502530480/photo/taj-mahal.jpg?s=2048x2048&w=is&k=20&c=19ircmn1AKuZ_9B-2yukjN8YFCyuxqQaMWmBjmeb8e4=", 
            "https://media.istockphoto.com/id/827043866/photo/fatehpur-sikri-city.jpg?s=2048x2048&w=is&k=20&c=15EAqdT24IpPAs-3ZKiFv80uuoiBsvQRcYKAw0aotS8="
        ],
        "description": "The State Museum in Lucknow is a treasure trove of historical artifacts and cultural exhibits that chronicle the rich heritage of Uttar Pradesh. Located in the picturesque Banarsi Bagh, the museum houses an extensive collection spanning various periods of Indian history. Visitors can explore an impressive array of sculptures, archaeological finds, numismatic collections, and artistic works that represent the region's diverse cultural landscape. The museum's galleries feature exhibits from the Gupta period, Mughal era, and colonial times, including rare manuscripts, ancient coins, decorative arts, and ethnographic displays. Highlights include intricate stone sculptures, bronze artifacts, miniature paintings, and traditional handicrafts that provide deep insights into the artistic and cultural evolution of North India.",
        "price": 110,
        "rating": 4.4,
        "exhibitCount": "2,500+",
        "contact": "uttarpradeshtourism.org.in | 022 6542 9871",
        "reviews": [
          { "name": "Rakesh Sharma", "rating": 5, "date": "February 15, 2025", "comment": "Incredible collection of historical artifacts. The sculpture gallery is absolutely magnificent!" },
          { "name": "Priya Mishra", "rating": 4, "date": "January 30, 2025", "comment": "Great museum with well-curated exhibits. Loved the sections on Mughal and Gupta period artifacts." },
          { "name": "Anil Kumar", "rating": 5, "date": "December 22, 2024", "comment": "A must-visit for anyone interested in Indian history. The numismatic collection is particularly impressive." },
          { "name": "Sarah Johnson", "rating": 4, "date": "November 10, 2024", "comment": "Fascinating museum with a diverse range of exhibits. Could spend hours exploring the different galleries." },
          { "name": "Vikram Singh", "rating": 5, "date": "October 5, 2024", "comment": "Beautifully maintained museum that showcases the rich cultural heritage of Uttar Pradesh." },
          { "name": "Meena Gupta", "rating": 4, "date": "September 15, 2024", "comment": "Interesting collection of archaeological finds and traditional art. Informative and well-organized exhibits." }
        ]
    },
    {
        "id": 27,
        "title": "Soham Heritage and Art Centre",
        "state": "Uttarakhand",
        "location": "Mussoorie",
        "address": "Library Road, Near Mall Road,\nMussoorie, Uttarakhand 248179",
        "subtitle": "Preserving and showcasing the rich cultural tapestry of Uttarakhand through art and artifacts.",
        "image": "https://media.istockphoto.com/id/1287190599/photo/amazing-click-heaven-in-uttarakhand-kedarnath-dham.jpg?s=2048x2048&w=is&k=20&c=zp9TYDJmeiQdyD7bPx-SU2ybxNq_YSIEPWGU4Ew-KWI=",
        "gallery": [
            "https://media.istockphoto.com/id/1287190599/photo/amazing-click-heaven-in-uttarakhand-kedarnath-dham.jpg?s=2048x2048&w=is&k=20&c=zp9TYDJmeiQdyD7bPx-SU2ybxNq_YSIEPWGU4Ew-KWI=", 
            "https://media.istockphoto.com/id/1044399860/photo/ganga-arthi-in-the-holy-city-of-rishikesh-in-uttarakhand-india-to-worship-river-ganga-ganges.jpg?s=2048x2048&w=is&k=20&c=zo0zBK9rUsUfwg6eIyv4RdBaEhNC4rGGX5-b7yRJvr0=", 
            "https://media.istockphoto.com/id/2190382840/photo/om-parvat-a-sacred-peak-in-the-himalayas-in-uttarakhand-india.jpg?s=2048x2048&w=is&k=20&c=SX_CET7pQUg0viTZkTT9aYn5DV0Vs4UX4JHnKxc4xG8="
        ],
        "description": "The Soham Heritage and Art Centre in Mussoorie is a vibrant cultural institution dedicated to preserving and celebrating the unique heritage of Uttarakhand. Located in the picturesque hill station, the museum offers visitors an immersive journey through the region's artistic, cultural, and historical landscape. The centre features carefully curated exhibits that showcase traditional handicrafts, local art forms, indigenous musical instruments, traditional costumes, and archaeological artifacts. Visitors can explore galleries dedicated to the diverse ethnic communities of Uttarakhand, including the Garhwali and Kumaoni cultures, with displays that highlight their traditional lifestyles, agricultural practices, religious traditions, and artistic expressions. The museum provides a comprehensive narrative of the region's social, cultural, and ecological heritage through its thoughtfully arranged collections.",
        "price": 150,
        "rating": 4.5,
        "exhibitCount": "800+",
        "contact": "uttarakhandtourism.org.in | 022 7654 3210",
        "reviews": [
          { "name": "Asha Rawat", "rating": 5, "date": "February 18, 2025", "comment": "An incredible showcase of Uttarakhand's rich cultural heritage. Every exhibit tells a fascinating story!" },
          { "name": "Deepak Singh", "rating": 4, "date": "January 25, 2025", "comment": "Wonderful museum that provides deep insights into the local traditions and art forms of the region." },
          { "name": "Neha Bhatt", "rating": 5, "date": "December 30, 2024", "comment": "The traditional costume and handicraft sections are absolutely mesmerizing. A must-visit for culture enthusiasts!" },
          { "name": "Michael Peterson", "rating": 4, "date": "November 15, 2024", "comment": "Well-organized museum with informative displays about the local mountain communities." },
          { "name": "Rajesh Kumar", "rating": 5, "date": "October 22, 2024", "comment": "Beautifully curated exhibits that capture the essence of Uttarakhand's diverse cultural landscape." }
        ]
    },
    {
        "id": 28,
        "title": "Indian Museum",
        "state": "West Bengal",
        "location": "Kolkata",
        "address": "Chowringhee Road, Park Street Area,\nKolkata, West Bengal 700016",
        "subtitle": "The largest and oldest museum in India, housing an extraordinary collection of historical and cultural artifacts.",
        "image": "https://media.istockphoto.com/id/2190215414/photo/view-of-the-ma-anandamoyi-temple-featuring-21-shikharas-sukharia-hooghly-west-bengal-india.jpg?s=2048x2048&w=is&k=20&c=3IHylC9k5orAJlFWtLJgid-LHAxXzMVMDTh_9a-bWN0=",
        "gallery": [
            "https://media.istockphoto.com/id/2190215414/photo/view-of-the-ma-anandamoyi-temple-featuring-21-shikharas-sukharia-hooghly-west-bengal-india.jpg?s=2048x2048&w=is&k=20&c=3IHylC9k5orAJlFWtLJgid-LHAxXzMVMDTh_9a-bWN0=", 
            "https://media.istockphoto.com/id/2192375433/photo/victoria-memorial-hall-victoria-park-calcata-west-bengal-india.jpg?s=2048x2048&w=is&k=20&c=clqvg-GZaT8xeBDNemgbkhJqPRfAHdJJhC_h6DNflwQ=", 
            "https://media.istockphoto.com/id/1164386039/photo/howrah-bridge-on-river-ganges-at-kolkata-at-twilight-with-moody-sky.jpg?s=2048x2048&w=is&k=20&c=yyLWm_OAuiWhvOh52WPNj2X0hGbe-rWik_TC5ECnXS0="
        ],
        "description": "The Indian Museum in Kolkata, established in 1814, is the oldest and largest museum in India, often referred to as the 'Jaadu Ghar' (House of Magic). This iconic institution spans multiple disciplines, offering an unparalleled journey through India's rich historical and cultural landscape. The museum's vast collection includes archaeological artifacts, anthropological exhibits, geological specimens, zoological displays, and an extensive array of art from various periods and regions. Visitors can explore remarkable sections dedicated to Egyptian mummies, Buddhist art, ancient sculptures, rare manuscripts, and ethnographic collections. The museum's six sections - Archaeological, Geological, Anthropological, Zoological, Economic Botany, and Art - provide a comprehensive view of human civilization, natural history, and cultural diversity. Its impressive collection includes prehistoric tools, Gandhara art, Mughal miniatures, and rare botanical and zoological specimens.",
        "price": 150,
        "rating": 4.6,
        "exhibitCount": "60,000+",
        "contact": "westbengaltourism.org.in | 022 5432 6789",
        "reviews": [
          { "name": "Sourav Chatterjee", "rating": 5, "date": "February 22, 2025", "comment": "An absolute treasure trove of historical artifacts. The archaeological section is mind-blowing!" },
          { "name": "Priya Banerjee", "rating": 4, "date": "January 18, 2025", "comment": "Incredible museum with an amazing collection. Some sections could use better lighting and modern displays." },
          { "name": "Robert Miller", "rating": 5, "date": "December 10, 2024", "comment": "One of the most comprehensive museums I've ever visited. The diversity of exhibits is truly impressive." },
          { "name": "Anita Desai", "rating": 4, "date": "November 25, 2024", "comment": "A must-visit for history buffs. The Gandhara art and Egyptian mummy collections are fascinating." },
          { "name": "Rahul Khanna", "rating": 5, "date": "October 15, 2024", "comment": "The museum is a living testament to India's rich cultural heritage. Every exhibit tells a unique story." },
          { "name": "Emily Wong", "rating": 4, "date": "September 5, 2024", "comment": "Extensive collections that provide deep insights into Indian history and culture. Highly recommended!" }
        ]
    },
    {
        "id": 29,
        "title": "Kalapani Museum",
        "state": "Andaman and Nicobar",
        "location": "Port Blair",
        "address": "Cellular Jail Complex, Aberdeen Bazaar,\nPort Blair, Andaman and Nicobar Islands 744101",
        "subtitle": "A poignant museum commemorating the heroic freedom fighters and their sacrifices during India's independence struggle.",
        "image": "https://media.istockphoto.com/id/1211613833/photo/cellular-jail.jpg?s=2048x2048&w=is&k=20&c=9QclHLA9ohZLIm0p2yLT624tRI4e29a70buA1hJvmUM=",
        "gallery": [
            "https://media.istockphoto.com/id/1211613833/photo/cellular-jail.jpg?s=2048x2048&w=is&k=20&c=9QclHLA9ohZLIm0p2yLT624tRI4e29a70buA1hJvmUM=", 
            "https://media.istockphoto.com/id/2164564979/photo/koh-lipe-sunrise-beach-scenes-thailand.jpg?s=2048x2048&w=is&k=20&c=eYw3Y5DfZTjxjorggjIigqnJum0BhJ81WaRtjaM4cIA=", 
            "https://media.istockphoto.com/id/968845932/photo/ball-room-ruins-at-ross-island-andaman.jpg?s=2048x2048&w=is&k=20&c=56Nou2YjznoQ9cXJMtBbRoWwwNDA23_RRUfwaP-sWeo="
        ],
        "description": "The Kalapani Museum, located within the historic Cellular Jail complex in Port Blair, stands as a powerful memorial to India's freedom struggle and the extraordinary sacrifices of political prisoners during the colonial era. The museum offers a deeply moving narrative of the brutal imprisonment system used by the British to suppress the independence movement. Through meticulously curated exhibits, photographs, artifacts, and multimedia presentations, visitors can explore the harrowing experiences of freedom fighters who were exiled to this notorious 'Kala Pani' (Black Water) prison. The museum chronicles the stories of revolutionaries, their resistance, the inhuman conditions they endured, and the significant role of the Andaman Islands in India's fight for independence. Interactive displays and preserved historical documents provide insights into the resilience and courage of those who fought for the nation's freedom.",
        "price": 150,
        "rating": 4.7,
        "exhibitCount": "500+",
        "contact": "andamannicobartourism.org.in | 022 6543 2109",
        "reviews": [
          { "name": "Vikram Malhotra", "rating": 5, "date": "February 10, 2025", "comment": "An incredibly moving museum that powerfully narrates the sacrifices of our freedom fighters." },
          { "name": "Anjali Sharma", "rating": 5, "date": "January 22, 2025", "comment": "A must-visit for every Indian. The exhibits are both educational and emotionally impactful." },
          { "name": "Rajesh Kumar", "rating": 4, "date": "December 15, 2024", "comment": "Detailed and sobering museum that provides deep insights into the colonial prison system." },
          { "name": "Sarah Thompson", "rating": 5, "date": "November 5, 2024", "comment": "Extraordinary museum that tells the untold stories of India's freedom struggle. Highly recommended!" },
          { "name": "Arun Patel", "rating": 4, "date": "October 20, 2024", "comment": "Powerful exhibits that bring to life the struggles of revolutionary prisoners. Very well-curated." },
          { "name": "Meera Reddy", "rating": 5, "date": "September 12, 2024", "comment": "An emotional journey through a critical chapter of India's independence movement. Truly inspiring!" }
        ]
    },
    {
        "id": 30,
        "title": "State Museum, Chandigarh",
        "state": "Chandigarh",
        "location": "Chandigarh",
        "address": "Sector 10, Museum Complex,\nChandigarh, Union Territory 160011",
        "subtitle": "A comprehensive museum showcasing rich artistic heritage from ancient to contemporary periods.",
        "image": "https://media.istockphoto.com/id/1276507545/photo/dehli-india.jpg?s=2048x2048&w=is&k=20&c=scXwVW6o05DGNcYS6qf4Qiel08tttNp6u6Z4ysl52mc=",
        "gallery": [
            "https://media.istockphoto.com/id/1276507545/photo/dehli-india.jpg?s=2048x2048&w=is&k=20&c=scXwVW6o05DGNcYS6qf4Qiel08tttNp6u6Z4ysl52mc=", 
            "https://media.istockphoto.com/id/1486545903/photo/rock-garden-chandigarh-in-the-evening.jpg?s=2048x2048&w=is&k=20&c=Lf-EYPo27JjlI0aDod26BaBoMUWHGIc8H0EB82wIyno=", 
            "https://media.istockphoto.com/id/1577156928/photo/close-up-image-of-statues-of-recycled-ceramics-sculpture-park-rock-garden-of-chandigarh-india.jpg?s=2048x2048&w=is&k=20&c=o0YLO984L5FTDaZvjdZsxbGggMg42e6dYYpO9bjXiZg="
        ],
        "description": "The State Museum in Chandigarh is a cultural landmark that offers visitors an extraordinary journey through India's artistic and historical landscape. Located in the architecturally acclaimed city designed by Le Corbusier, the museum houses an exceptional collection of Gandhara sculptures, rare Pahari miniature paintings, and an impressive array of contemporary Indian art. The museum's diverse galleries provide insights into different artistic traditions, archaeological discoveries, and cultural evolution. Visitors can explore exhibits ranging from ancient stone sculptures and bronze artifacts to modern paintings and decorative arts. The museum's collection includes archaeological finds from the Harappan civilization, ethnographic displays representing Punjab and Haryana's cultural diversity, and a significant collection of traditional and contemporary art that reflects the region's rich artistic heritage.",
        "price": 110,
        "rating": 4.5,
        "exhibitCount": "3,000+",
        "contact": "chandigarhutourism.org.in | 022 7654 9012",
        "reviews": [
          { "name": "Naveen Sharma", "rating": 5, "date": "February 17, 2025", "comment": "Incredible museum with an amazing collection of Gandhara sculptures and Pahari paintings!" },
          { "name": "Priya Malhotra", "rating": 4, "date": "January 25, 2025", "comment": "Well-curated museum that offers a deep dive into the artistic heritage of North India." },
          { "name": "Rajesh Kumar", "rating": 5, "date": "December 10, 2024", "comment": "The contemporary art section is particularly impressive. A must-visit for art enthusiasts!" },
          { "name": "Emily Chen", "rating": 4, "date": "November 15, 2024", "comment": "Fascinating exhibits that showcase the rich cultural history of the region." },
          { "name": "Amit Verma", "rating": 5, "date": "October 5, 2024", "comment": "Beautifully maintained museum with an incredible collection of archaeological artifacts." },
          { "name": "Sonia Kapoor", "rating": 4, "date": "September 20, 2024", "comment": "Great museum with diverse exhibits ranging from ancient sculptures to modern art." }
        ]
    },
    {
        "id": 31,
        "title": "Diu Museum",
        "state": "Dadra and Nagar Haveli",
        "location": "Diu",
        "address": "St. Thomas Church Complex, Fortim Road,\nDiu, Dadra and Nagar Haveli 362520",
        "subtitle": "Unique museum housed in a historic Portuguese church, showcasing colonial-era artifacts and religious heritage.",
        "image": "https://media.istockphoto.com/id/2148348268/photo/lighthouse-at-the-diu-fortress-or-diu-fort-located-on-the-west-coast-of-india-in-diu-gujrat.jpg?s=2048x2048&w=is&k=20&c=cLf0Njhc8Nn0MCp0AX1uzrEpUr4rLj1oIIxyb6NImTs=",
        "gallery": [
            "https://media.istockphoto.com/id/2148348268/photo/lighthouse-at-the-diu-fortress-or-diu-fort-located-on-the-west-coast-of-india-in-diu-gujrat.jpg?s=2048x2048&w=is&k=20&c=cLf0Njhc8Nn0MCp0AX1uzrEpUr4rLj1oIIxyb6NImTs=", 
            "https://media.istockphoto.com/id/2188807461/photo/architecture-and-history-at-diu-fort-gujarat.jpg?s=2048x2048&w=is&k=20&c=w2_Sx53W-uBEAu7lp9FaKuqoe_MgACYrg7H6IALC3Go=", 
            "https://media.istockphoto.com/id/2183814627/photo/mumbai-maharashtra-india-high-court-bombay-close-up-high-court-bombay-building-at-sunset-the.jpg?s=2048x2048&w=is&k=20&c=ncXEkHucE70nEZLZfoGBNi2UHijiLZljU4QgrRX2Obw="
        ],
        "description": "The Diu Museum, strategically located within the historic St. Thomas Church complex, offers visitors a fascinating glimpse into the Portuguese colonial legacy of the region. Transformed from a sacred religious space into a cultural repository, the museum houses an impressive collection of architectural fragments, religious sculptures, ancient manuscripts, and decorative artifacts that narrate the rich maritime and cultural history of Diu. Exhibits include intricately carved stone panels, Portuguese-era architectural elements, Christian religious art, maritime artifacts, and archaeological finds that demonstrate the unique cultural confluence of Indian and Portuguese traditions. The museum's setting in a beautifully preserved colonial-era church adds an extraordinary architectural dimension to the visitor's experience, making it a must-visit destination for history enthusiasts and cultural explorers.",
        "price": 120,
        "rating": 4.3,
        "exhibitCount": "350+",
        "contact": "dadrannagarhavelihtourism.org.in | 022 5678 3421",
        "reviews": [
          { "name": "Rahul Desai", "rating": 5, "date": "February 12, 2025", "comment": "Fascinating museum that beautifully captures the Portuguese colonial history of Diu!" },
          { "name": "Maria Santos", "rating": 4, "date": "January 30, 2025", "comment": "Interesting collection of artifacts in a stunning church setting. Very informative!" },
          { "name": "Anil Patel", "rating": 5, "date": "December 18, 2024", "comment": "The architectural details and religious artifacts are absolutely mesmerizing." },
          { "name": "Elizabeth Brown", "rating": 4, "date": "November 22, 2024", "comment": "A hidden gem that provides deep insights into Diu's unique cultural heritage." },
          { "name": "Sameer Shaikh", "rating": 4, "date": "October 10, 2024", "comment": "Well-curated museum with excellent preservation of Portuguese-era artifacts." }
        ]
    },
    {
        "id": 32,
        "title": "Marine Museum",
        "state": "Lakshadweep",
        "location": "Kavaratti",
        "address": "Marine Interpretation Centre, Beach Road,\nKavaratti, Lakshadweep 682555",
        "subtitle": "Comprehensive marine ecosystem museum showcasing the unique biodiversity of Lakshadweep Islands.",
        "image": "https://media.istockphoto.com/id/1481594682/photo/lakshadweep-islands.jpg?s=2048x2048&w=is&k=20&c=_SR5FTSA2Nl9q7GRLMAX1Kqw3P9S9CdlDgsFlNt-kAY=",
        "gallery": [
            "https://media.istockphoto.com/id/1481594682/photo/lakshadweep-islands.jpg?s=2048x2048&w=is&k=20&c=_SR5FTSA2Nl9q7GRLMAX1Kqw3P9S9CdlDgsFlNt-kAY=", 
            "https://media.istockphoto.com/id/1481594682/photo/lakshadweep-islands.jpg?s=2048x2048&w=is&k=20&c=_SR5FTSA2Nl9q7GRLMAX1Kqw3P9S9CdlDgsFlNt-kAY=", 
            "https://media.istockphoto.com/id/1441374382/photo/the-resident-area-of-fulidhoo.jpg?s=2048x2048&w=is&k=20&c=lJvJbLEy0GDOzYNZ8pcKSUgYQI0kaGmXBCqg9Hol_rM="
        ],
        "description": "The Marine Museum in Kavaratti offers a captivating exploration of the rich marine ecosystems of the Lakshadweep archipelago. Dedicated to preserving and showcasing the extraordinary underwater world of these pristine islands, the museum features an extensive collection of marine life specimens, coral formations, sea shells, and interactive exhibits that highlight the unique biodiversity of the region. Visitors can discover the intricate marine habitats, learn about conservation efforts, and gain insights into the delicate ecological balance of coral reef systems. The museum's displays include preserved marine specimens, detailed dioramas of underwater landscapes, scientific models of marine organisms, and informative exhibits about the maritime heritage and ecological significance of the Lakshadweep Islands. Interactive displays and educational programs provide visitors with a deeper understanding of marine conservation and the importance of protecting these fragile ecosystems.",
        "price": 130,
        "rating": 4.4,
        "exhibitCount": "250+",
        "contact": "lakshadweeptourism.org.in | 022 4321 6789",
        "reviews": [
          { "name": "Priya Nair", "rating": 5, "date": "February 20, 2025", "comment": "An incredible museum that brings the underwater world of Lakshadweep to life!" },
          { "name": "Rahul Menon", "rating": 4, "date": "January 15, 2025", "comment": "Fascinating exhibits that showcase the rich marine biodiversity of the islands." },
          { "name": "Sarah Johnson", "rating": 5, "date": "December 22, 2024", "comment": "The coral reef and marine life displays are absolutely stunning and educational." },
          { "name": "Vikram Singh", "rating": 4, "date": "November 10, 2024", "comment": "Great museum for understanding the unique marine ecosystem of Lakshadweep." },
          { "name": "Meera Reddy", "rating": 5, "date": "October 5, 2024", "comment": "A must-visit for nature lovers and those interested in marine conservation!" }
        ]
    },
    {
        "id": 33,
        "title": "National Museum",
        "state": "Delhi",
        "location": "New Delhi",
        "address": "Janpath Road, near Viceregal Lodge,\nNew Delhi, Delhi 110011",
        "subtitle": "The most comprehensive museum in India, housing an extraordinary collection of art, archaeology, and cultural artifacts.",
        "image": "https://media.istockphoto.com/id/1358579645/photo/jama-masjid-of-delhi.jpg?s=2048x2048&w=is&k=20&c=KcHbpVQvD3f2bDiu6VWlgJSOMDTE_ArN62PIJxeSKSI=",
        "gallery": [
            "https://media.istockphoto.com/id/1358579645/photo/jama-masjid-of-delhi.jpg?s=2048x2048&w=is&k=20&c=KcHbpVQvD3f2bDiu6VWlgJSOMDTE_ArN62PIJxeSKSI=", 
            "https://media.istockphoto.com/id/1358579645/photo/jama-masjid-of-delhi.jpg?s=2048x2048&w=is&k=20&c=KcHbpVQvD3f2bDiu6VWlgJSOMDTE_ArN62PIJxeSKSI=", 
            "https://media.istockphoto.com/id/1154094384/photo/monsoon-clouds-over-the-india-gate.jpg?s=2048x2048&w=is&k=20&c=ioP8DJBI2L5TT13zA8MjbMYjJnCWq6T7Dma_yXilz10="
        ],
        "description": "The National Museum in New Delhi stands as a monumental institution preserving India's rich cultural heritage, spanning over 5,000 years of artistic and historical evolution. Established in 1949, the museum houses an unparalleled collection of over 200,000 works of art, including paintings, sculptures, decorative arts, arms and armory, archaeological finds, and ethnographic objects. Visitors can explore diverse galleries featuring Harappan civilization artifacts, Chola bronzes, Mughal miniature paintings, prehistoric tools, textiles, manuscripts, and numismatic collections. The museum's extensive collections represent various regions, periods, and artistic traditions of India, offering a comprehensive journey through the country's cultural landscape. Notable highlights include the Buddhist art section, rare manuscripts, intricate miniature paintings, sculptures from different historical periods, and an impressive collection of decorative arts that showcase India's artistic excellence.",
        "price": 150,
        "rating": 4.7,
        "exhibitCount": "200,000+",
        "contact": "delhitourism.org.in | 022 6543 2198",
        "reviews": [
          { "name": "Rajesh Sharma", "rating": 5, "date": "February 25, 2025", "comment": "An absolutely incredible museum that showcases the entire breadth of Indian cultural heritage!" },
          { "name": "Priya Malhotra", "rating": 5, "date": "January 30, 2025", "comment": "Every gallery is a treasure trove of historical and artistic wonders. A must-visit for anyone interested in Indian history." },
          { "name": "Michael Thompson", "rating": 4, "date": "December 15, 2024", "comment": "Extensive collections that provide deep insights into India's rich cultural diversity." },
          { "name": "Anjali Reddy", "rating": 5, "date": "November 22, 2024", "comment": "The Harappan and Buddhist art sections are absolutely breathtaking. Incredibly well-curated museum!" },
          { "name": "Vikram Patel", "rating": 4, "date": "October 10, 2024", "comment": "Comprehensive museum with an impressive range of artifacts from across Indian history." },
          { "name": "Emma Wilson", "rating": 5, "date": "September 5, 2024", "comment": "A world-class museum that truly represents the depth and richness of Indian culture and art." }
        ]
    },
    {
        "id": 34,
        "title": "Pondicherry Museum",
        "state": "Puducherry",
        "location": "Puducherry",
        "address": "Saint Louis Street, near French Quarter,\nPuducherry, Puducherry 605001",
        "subtitle": "A captivating museum showcasing the unique Franco-Indian cultural heritage of Puducherry.",
        "image": "https://media.istockphoto.com/id/2182483918/photo/view-of-auroville-auroville-is-an-experimental-township-in-viluppuram-district-mostly-in-the.jpg?s=2048x2048&w=is&k=20&c=q1yeDaSzXDc32xHBFF5dX15LQ5NiWCJ5sbbX_FlDP1o=",
        "gallery": [
            "https://media.istockphoto.com/id/2182483918/photo/view-of-auroville-auroville-is-an-experimental-township-in-viluppuram-district-mostly-in-the.jpg?s=2048x2048&w=is&k=20&c=q1yeDaSzXDc32xHBFF5dX15LQ5NiWCJ5sbbX_FlDP1o=", 
            "https://media.istockphoto.com/id/500320921/photo/pondicherry-harbor.jpg?s=2048x2048&w=is&k=20&c=EPJuhz0G2oA1kWLcitrqD1FsicW6FCCAC9yC6JP8yP8=", 
            "https://media.istockphoto.com/id/971437206/photo/french-architecture-pondicherry.jpg?s=2048x2048&w=is&k=20&c=SuQ8aepzrbd388iBTYjaj23nAhG6B4gBP5feW7PJaiI="
        ],
        "description": "The Pondicherry Museum offers a fascinating journey through the region's rich historical and cultural landscape, with a particular focus on the French colonial period. Located in the heart of the French Quarter, the museum houses an extensive collection of archaeological artifacts, French colonial memorabilia, ancient sculptures, and ethnographic exhibits that reflect the unique cultural synthesis of Puducherry. Visitors can explore galleries featuring architectural fragments from French colonial buildings, traditional Tamil sculptures, ancient pottery, numismatic collections, and exhibits detailing the maritime history of the region. The museum provides deep insights into the architectural, artistic, and cultural exchanges between French and Indian traditions, showcasing rare artifacts, historical documents, and preserved items that narrate the complex history of Puducherry.",
        "price": 150,
        "rating": 0,
        "exhibitCount": "1,200+",
        "contact": "puduchurrytourism.org.in | 022 5678 4321",
        "reviews": []
    },
    {
        "id": 35,
        "title": "Sri Pratap Singh Museum",
        "state": "Jammu and Kashmir",
        "location": "Srinagar",
        "address": "Mubarak Mandi Complex, near Sher-e-Kashmir Park,\nSrinagar, Jammu and Kashmir 190001",
        "subtitle": "A comprehensive museum showcasing the rich cultural and historical heritage of Jammu and Kashmir.",
        "image": "https://media.istockphoto.com/id/1206379291/photo/mughal-heritage-building-with-snoe-covered-zabarwan-mountains-in-the-background-during-autumn.jpg?s=2048x2048&w=is&k=20&c=zW9W6tKHq2x4vWBnGCozucPxMkLb-tse35OoRb3aU3Y=",
        "gallery": [
            "https://media.istockphoto.com/id/1206379291/photo/mughal-heritage-building-with-snoe-covered-zabarwan-mountains-in-the-background-during-autumn.jpg?s=2048x2048&w=is&k=20&c=zW9W6tKHq2x4vWBnGCozucPxMkLb-tse35OoRb3aU3Y=", 
            "https://media.istockphoto.com/id/2166763007/photo/dal-lake-srinagar-jammu-and-kashmir-india.jpg?s=2048x2048&w=is&k=20&c=7Awe3-LEHsk9hfEcc_Nw6y2XDlvbmXMFUpXu9Xc5qpY=", 
            "https://media.istockphoto.com/id/1067678216/photo/snow-mountain-view-of-leh-ladakh-district-norther-part-of-india.jpg?s=2048x2048&w=is&k=20&c=riDK5V-7W5-3k5ebcf6tlLSih8Qqir9vwcYPz_8qXz4="
        ],
        "description": "The Sri Pratap Singh Museum, located in the historic Mubarak Mandi Complex in Srinagar, is a treasure trove of Jammu and Kashmir's cultural legacy. Named after Maharaja Pratap Singh, the museum houses an extensive collection of archaeological artifacts, rare manuscripts, traditional handicrafts, numismatic collections, and historical exhibits that chronicle the region's diverse cultural heritage. Visitors can explore galleries featuring ancient sculptures, traditional costumes, intricate woodwork, prehistoric tools, royal memorabilia, and ethnographic displays representing the various communities of Jammu and Kashmir. The museum provides a comprehensive narrative of the region's artistic, historical, and cultural evolution, showcasing the unique blend of influences from different periods and civilizations that have shaped the area's rich heritage.",
        "price": 120,
        "rating": 4.5,
        "exhibitCount": "1,500+",
        "contact": "jammukashtourism.org.in | 022 4321 7890",
        "reviews": [
          { "name": "Amir Khan", "rating": 5, "date": "February 20, 2025", "comment": "An incredible museum that beautifully captures the rich cultural heritage of Jammu and Kashmir!" },
          { "name": "Priya Sharma", "rating": 4, "date": "January 25, 2025", "comment": "Fascinating collection of artifacts that showcase the region's diverse historical background." },
          { "name": "Rajesh Kumar", "rating": 5, "date": "December 15, 2024", "comment": "The traditional handicrafts and royal memorabilia sections are absolutely stunning!" },
          { "name": "Sarah Thompson", "rating": 4, "date": "November 10, 2024", "comment": "Interesting museum that provides deep insights into the cultural diversity of J&K." },
          { "name": "Vikram Singh", "rating": 5, "date": "October 5, 2024", "comment": "A must-visit for history enthusiasts. The museum tells a compelling story of the region." },
          { "name": "Meera Reddy", "rating": 4, "date": "September 20, 2024", "comment": "Well-curated exhibits that highlight the unique heritage of Jammu and Kashmir." }
        ]
    },
    {
        "id": 36,
        "title": "Ladakh Heritage Museum",
        "state": "Ladakh",
        "location": "Leh",
        "address": "Fort Road, near Leh Market,\nLeh, Ladakh 194101",
        "subtitle": "A comprehensive museum dedicated to preserving and showcasing the unique cultural heritage of Ladakh.",
        "image": "https://media.istockphoto.com/id/489953644/photo/tibetan-buddhist-monastery-hemis-gompa-himalaya-tibet-ladakh-india.jpg?s=2048x2048&w=is&k=20&c=7HFyTHEwXpVWK2dLN3xUsB5oUYhXkqa30LTez0wt_3M=",
        "gallery": [
            "https://media.istockphoto.com/id/489953644/photo/tibetan-buddhist-monastery-hemis-gompa-himalaya-tibet-ladakh-india.jpg?s=2048x2048&w=is&k=20&c=7HFyTHEwXpVWK2dLN3xUsB5oUYhXkqa30LTez0wt_3M=", 
            "https://media.istockphoto.com/id/471925925/photo/beautiful-landscape-in-norther-part-of-india.jpg?s=2048x2048&w=is&k=20&c=F6njm-J_UqtSeSKiZWNqxh3vK9EEILB37bo_mv9rHsw=", 
            "https://media.istockphoto.com/id/1185846375/photo/an-evening-view-of-thiksey-monastery-leh-india.jpg?s=2048x2048&w=is&k=20&c=m5NoWmqBh2oaMQEdtmlFXVfyEjObDqKkoXY04SkNhHM="
        ],
        "description": "The Ladakh Heritage Museum in Leh is a remarkable institution that offers visitors an immersive journey through the rich cultural landscape of the Himalayan region. Located in the heart of Leh, the museum houses an extensive collection of Buddhist artifacts, traditional costumes, archaeological finds, religious manuscripts, and ethnographic exhibits that capture the essence of Ladakhi culture. Visitors can explore galleries featuring intricate thangka paintings, ancient Buddhist sculptures, traditional musical instruments, local handicrafts, and displays showcasing the region's unique architectural and social history. The museum provides deep insights into the spiritual, artistic, and daily life of Ladakhi communities, highlighting the profound influence of Tibetan Buddhist culture and the region's distinctive high-altitude lifestyle.",
        "price": 130,
        "rating": 4.6,
        "exhibitCount": "800+",
        "contact": "ladakhtourism.org.in | 022 6543 9012",
        "reviews": [
          { "name": "Tenzin Dorje", "rating": 5, "date": "February 22, 2025", "comment": "An extraordinary museum that beautifully captures the essence of Ladakhi culture and Buddhist heritage!" },
          { "name": "Rajesh Patel", "rating": 4, "date": "January 30, 2025", "comment": "Fascinating collection of artifacts that provide deep insights into Ladakh's unique cultural landscape." },
          { "name": "Emma Wilson", "rating": 5, "date": "December 15, 2024", "comment": "The thangka paintings and Buddhist artifacts are absolutely mesmerizing!" },
          { "name": "Akash Sharma", "rating": 4, "date": "November 20, 2024", "comment": "Well-curated museum that showcases the rich traditions of Ladakh." },
          { "name": "Sophie Martin", "rating": 5, "date": "October 10, 2024", "comment": "A must-visit for anyone interested in Himalayan culture and Buddhist art." },
          { "name": "Vikram Singh", "rating": 4, "date": "September 5, 2024", "comment": "Excellent museum that provides a comprehensive view of Ladakh's cultural heritage." }
        ]
    }                    
];

// addMuseums();