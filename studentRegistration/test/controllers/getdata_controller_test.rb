require 'test_helper'

class GetdataControllerTest < ActionController::TestCase
  test "should get getjson" do
    get :getjson
    assert_response :success
  end

end
