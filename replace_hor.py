with open("d:/Antigravity Local/SportClub/index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Find start and end markers
start_marker = '<div class="hor-cards-grid">'
end_marker = '      </div>\n    </div>\n  </section>\n\n  <!-- CONTACTO -->'

start = content.find(start_marker)
end = content.find(end_marker)

if start == -1 or end == -1:
    print(f"Markers not found: start={start}, end={end}")
    # Try alternate
    idx = content.find('hor-cards-grid')
    print(f"hor-cards-grid at: {idx}")
    print(repr(content[idx-5:idx+30]))
else:
    # Replace from start of grid to just before end_marker
    new_block = '''      <!-- Slider wrapper -->
      <div class="hc-slider-wrap">
        <button class="hc-btn hc-btn-prev" id="hcPrev" aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div class="hc-viewport" id="hcViewport">
          <div class="hc-track" id="hcTrack">

            <!-- Gimnasio -->
            <div class="hc" data-tilt>
              <div class="hc-bg" style="background-image:url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop')"></div>
              <div class="hc-overlay"></div>
              <div class="hc-spotlight"></div>
              <div class="hc-body">
                <span class="hc-tag">Gimnasio</span>
                <h3 class="hc-title">Entrena sin<br/><strong>l\u00edmites</strong></h3>
                <div class="hc-schedule">
                  <div class="hc-row"><span>Mar \u2013 S\u00e1b</span><b>6:00 \u2013 22:00</b></div>
                  <div class="hc-row"><span>Domingo</span><b>8:00 \u2013 18:00</b></div>
                </div>
              </div>
            </div>

            <!-- Alberca -->
            <div class="hc" data-tilt>
              <div class="hc-bg" style="background-image:url('https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80&auto=format&fit=crop')"></div>
              <div class="hc-overlay"></div>
              <div class="hc-spotlight"></div>
              <div class="hc-body">
                <span class="hc-tag">Alberca</span>
                <h3 class="hc-title">Nada en<br/><strong>libertad</strong></h3>
                <div class="hc-schedule">
                  <div class="hc-row"><span>Mar \u2013 S\u00e1b</span><b>6:00 \u2013 21:30</b></div>
                  <div class="hc-row"><span>Domingo</span><b>8:00 \u2013 17:30</b></div>
                </div>
                <p class="hc-note">Gorra y goggles obligatorios</p>
              </div>
            </div>

            <!-- Tenis -->
            <div class="hc" data-tilt>
              <div class="hc-bg" style="background-image:url('https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80&auto=format&fit=crop')"></div>
              <div class="hc-overlay"></div>
              <div class="hc-spotlight"></div>
              <div class="hc-body">
                <span class="hc-tag">Tenis</span>
                <h3 class="hc-title">Canchas<br/><strong>profesionales</strong></h3>
                <div class="hc-schedule">
                  <div class="hc-row"><span>Mar \u2013 S\u00e1b</span><b>6:00 \u2013 21:30</b></div>
                  <div class="hc-row"><span>Domingo</span><b>8:00 \u2013 17:30</b></div>
                </div>
              </div>
            </div>

            <!-- Yoga -->
            <div class="hc" data-tilt>
              <div class="hc-bg" style="background-image:url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80&auto=format&fit=crop')"></div>
              <div class="hc-overlay"></div>
              <div class="hc-spotlight"></div>
              <div class="hc-body">
                <span class="hc-tag">Yoga &amp; Meditaci\u00f3n</span>
                <h3 class="hc-title">Mente y cuerpo<br/><strong>en equilibrio</strong></h3>
                <div class="hc-schedule">
                  <div class="hc-row"><span>Mar \u2013 S\u00e1b</span><b>7:00 \u2013 20:00</b></div>
                  <div class="hc-row"><span>Domingo</span><b>9:00 \u2013 14:00</b></div>
                </div>
              </div>
            </div>

            <!-- Spinning -->
            <div class="hc" data-tilt>
              <div class="hc-bg" style="background-image:url('https://images.unsplash.com/photo-1570829460005-c840387bb1ca?w=800&q=80&auto=format&fit=crop')"></div>
              <div class="hc-overlay"></div>
              <div class="hc-spotlight"></div>
              <div class="hc-body">
                <span class="hc-tag">Spinning</span>
                <h3 class="hc-title">Energ\u00eda al<br/><strong>m\u00e1ximo</strong></h3>
                <div class="hc-schedule">
                  <div class="hc-row"><span>Mar \u2013 S\u00e1b</span><b>7:00 \u2013 21:00</b></div>
                  <div class="hc-row"><span>Domingo</span><b>8:00 \u2013 14:00</b></div>
                </div>
              </div>
            </div>

            <!-- Atenci\u00f3n a Socios -->
            <div class="hc" data-tilt>
              <div class="hc-bg" style="background-image:url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80&auto=format&fit=crop')"></div>
              <div class="hc-overlay"></div>
              <div class="hc-spotlight"></div>
              <div class="hc-body">
                <span class="hc-tag">Atenci\u00f3n a Socios</span>
                <h3 class="hc-title">Siempre<br/><strong>a tu servicio</strong></h3>
                <div class="hc-schedule">
                  <div class="hc-row"><span>Mar \u2013 Vie</span><b>8:00\u201314:00 \u00b7 16:00\u201319:00</b></div>
                  <div class="hc-row"><span>S\u00e1b \u2013 Dom</span><b>9:00 \u2013 14:00</b></div>
                </div>
              </div>
            </div>

          </div><!-- /hc-track -->
        </div><!-- /hc-viewport -->

        <button class="hc-btn hc-btn-next" id="hcNext" aria-label="Siguiente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div><!-- /hc-slider-wrap -->'''

    content = content[:start] + new_block + '\n    ' + content[end:]
    with open("d:/Antigravity Local/SportClub/index.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("OK - replaced successfully")
