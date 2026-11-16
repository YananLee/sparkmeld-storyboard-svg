import unittest
from xml.etree import ElementTree
from sparkmeld_storyboard_svg import render_storyboard

class RenderTests(unittest.TestCase):
    def test_svg(self):
        svg = render_storyboard(["Opening scene", "Closing scene"])
        self.assertEqual(ElementTree.fromstring(svg).tag, "{http://www.w3.org/2000/svg}svg")

if __name__ == "__main__": unittest.main()
