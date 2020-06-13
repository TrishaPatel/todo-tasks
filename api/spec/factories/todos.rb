FactoryBot.define do
  factory :todo do
    description { Faker::Lorem.word }
    status { 0 }

  end
end
