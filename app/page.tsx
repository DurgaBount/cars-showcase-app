"use client";

import Image from "next/image";
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [year, setYear] = useState(2022);
  const [fuel, setFuel] = useState("");
  const [limit, setLimit] = useState(10);
  const [model, setModel] = useState("");
  const [manufacturer, setManuFacturer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log("manufacturer", manufacturer);
      console.log("model", model);

      const results = await fetchCars({
        manufacturer: manufacturer,
        year: year,
        fuel: fuel,
        limit: limit,
        model: model,
      });

      setAllCars(results);
    };

    fetchData(); // Call the async function
  }, [year, fuel, limit, model, manufacturer]);

  console.log(allCars);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <div className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar
            manufacturer={manufacturer}
            setManuFacturer={(res: any) => {
              console.log("manufacturerres", res);

              setManuFacturer(res);
            }}
            model={model}
            setModel={(res: any) => {
              console.log("modelres", res);

              setModel(res);
            }}
          />

          <div className="home__filter-container">
            <CustomFilter
              title="fuel"
              options={fuels}
              selected={fuel}
              setSelected={setFuel}
            />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              selected={year}
              setSelected={setYear}
            />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(limit || 10) / 10}
              isNext={(limit || 10) > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no resultss</h2>
            {/* <p>{allCars?.message}</p> */}
          </div>
        )}
      </div>
    </div>
  );
}
