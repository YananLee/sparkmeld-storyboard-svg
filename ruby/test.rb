require "minitest/autorun"
require_relative "lib/sparkmeld_storyboard_svg"
class PackageTest < Minitest::Test
  def test_svg
    svg = SparkMeldStoryboardSvg.render(["Intro", "Final"])
    assert_match(/<svg/, svg)
  end
end
