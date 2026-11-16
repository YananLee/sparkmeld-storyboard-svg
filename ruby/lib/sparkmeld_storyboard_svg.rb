# frozen_string_literal: true
require "cgi"
module SparkMeldStoryboardSvg
  def self.render(prompts, width: 900, card_color: "#e9edff")
    raise ArgumentError, "provide 1 to 12 prompts" unless prompts.is_a?(Array) && (1..12).cover?(prompts.length) && prompts.all? { |x| !x.to_s.strip.empty? }
    raise ArgumentError, "invalid options" unless width.is_a?(Integer) && width >= 400 && card_color.match?(/\A#[0-9a-fA-F]{6}\z/)
    columns=[3,prompts.length].min; rows=(prompts.length.to_f/columns).ceil; gap=16; card_width=(width-gap*(columns+1)).to_f/columns; card_height=180; height=rows*(card_height+gap)+gap
    svg=+%(<svg xmlns="http://www.w3.org/2000/svg" width="#{width}" height="#{height}" viewBox="0 0 #{width} #{height}" role="img" aria-label="Storyboard with #{prompts.length} scenes"><rect width="100%" height="100%" fill="#ffffff"/>)
    prompts.each_with_index do |prompt,i|
      x=gap+(i%columns)*(card_width+gap); y=gap+(i/columns)*(card_height+gap)
      svg << %(<rect x="#{x.round(1)}" y="#{y}" width="#{card_width.round(1)}" height="#{card_height}" rx="12" fill="#{card_color}"/><text x="#{(x+18).round(1)}" y="#{y+36}" font-family="Arial,sans-serif" font-size="18" fill="#303f91">Scene #{i+1}</text>)
      prompt.to_s.strip.scan(/.{1,32}/m).first(4).each_with_index do |line,j|
        svg << %(<text x="#{(x+18).round(1)}" y="#{y+76+j*24}" font-family="Arial,sans-serif" font-size="16" fill="#22283a">#{CGI.escapeHTML(line)}</text>)
      end
    end
    svg << "</svg>"
  end
end
