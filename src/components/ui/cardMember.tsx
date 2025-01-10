import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

interface Member {
    name: string;
    date: string; 
    image: string; 
}

const MemberCard = ({ member }: { member: Member }) => {
    return (
        <Card
            isFooterBlurred
            className="w-[300px] h-[400px] bg-black overflow-hidden rounded-xl shadow-lg"
        >
            <div className="relative h-full group">
                <Image
                    alt={`Imagen de ${member.name}`}
                    className="z-0 object-cover w-full h-full transform group-hover:scale-125 transition-transform duration-300"
                    src={member.image}
                />

                <CardFooter className="absolute bottom-0 w-full bg-black/70 text-white p-4">
                    <div className="flex flex-col">
                        <h3 className="text-base font-bold">{member.name}</h3>
                        <p className="text-sm text-gray-400">Tutor desde {member.date}</p>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
};

export default MemberCard;
