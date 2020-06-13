class TodoSerializer < ActiveModel::Serializer
  attributes :description, :status, :id
  # this will convert all the null value to string
  # def attributes(*_args)
  #   all_attr = super
  #   object.attributes.each do |attr|
  #     all_attr[attr[0]] = attr[1].nil?? "" : attr[1]
  #   end
  #   all_attr
  # end
end
