import ListCar from "@/components/listCar"
import SideFilter from "@/components/sideFilter"

const Product = () => {
    let cars = ["/brio.jpeg", "/fortuner.jpeg", "/omoda.jpeg", "/brio.jpeg","/xenia.jpeg","/sigra.jpeg"]
    cars = cars.concat(cars)
    let merk = 'Honda Brio 2024'
    let desc = 'Rp 334.800.000 - Rp 493.800.000'
    return (
        <div className="space-y-4 py-4 flex" id="listcar">
            <section>
                <SideFilter />
            </section>
            <section className="w-4/5 grid grid-cols-2 gap-4">
            {cars.map((car, index) => (
                <ListCar image_url={car} merk={merk} description={desc} key={index}></ListCar>
            ))}
            </section>
        </div>
    )
}

export default Product