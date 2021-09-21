type ShouldBeNever<T extends never> = 0;
type IsNever<T> = T extends never ? true : false;

type StringOrNumber = string | number;
type StringAndNumber = string & number;

type StringOrNumberCheck = ShouldBeNever<StringOrNumber>;
type StringAndNumberCheck = ShouldBeNever<StringAndNumber>;

// Just a union
type Human = {
    sayHello: () => string;
};
type Dog = {
    bark: () => string;
};

type HumanOrDog = Human | Dog;
type HumanAndDog = Human & Dog;
type HumanAndDogCheck = ShouldBeNever<HumanAndDog>;
// Should not exist!
const lolly: HumanAndDog = {
    bark: () => "Argh",
    sayHello: () => "Hi, I am Lolly",
};

// Descriminated Union aka Tagged Union

type HumanTagged = {
    type: "Human";
    sayHello: () => string;
};
type DogTagged = {
    type: "Dog";
    bark: () => string;
};
type HumanOrDogTagged = HumanTagged | DogTagged;
type HumanAndDogTagged = HumanTagged & DogTagged;

// Prohibited
type HumanAndDogTaggedCheck = ShouldBeNever<HumanAndDogTagged>;

const lollyTagged: HumanAndDogTagged = {
    type: "Dog",
    bark: () => "Argh",
    sayHello: () => "Hi, I am Lolly",
};

// Runtime check
declare const humanOrDog: HumanOrDogTagged;
if (humanOrDog.type === "Dog") {
    humanOrDog.bark();
    humanOrDog.sayHello();
}
