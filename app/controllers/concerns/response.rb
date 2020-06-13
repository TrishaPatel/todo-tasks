module Response
  def json_response(object, serializer, status = :ok)
    render json: object, status: status, each_serializer: serializer
  end
end
