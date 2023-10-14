import sys
import json
from docxtpl import DocxTemplate, InlineImage
from docx.shared import Cm, Inches, Mm, Emu


if __name__ == "__main__":
    data = json.loads(sys.argv[1])
    
    """Opening Word Document and add data"""
    doc = DocxTemplate("./template_evm.docx")
    chart_weekdays_visits_ranking = InlineImage(doc,'./imgs/chart_weekdays_visits_ranking.png',width=Cm(15))
    chart_local_time_visits_ranking = InlineImage(doc,'./imgs/chart_local_time_visits_ranking.png',width=Cm(15))
    # doc.replace_pic('default1.png', './imgs/chart_weekdays_visits_ranking.png')
    # doc.replace_pic('default2.png', './imgs/chart_local_time_visits_ranking.png')
    #replace charts
    i=1
    for key in data.keys():
        if key.startswith('chart_'):
            print(data[key])
            if(i==1):
                data[key] = chart_weekdays_visits_ranking
            else:
                data[key] = chart_local_time_visits_ranking
            i+=1
    
    doc.render(data)
    doc.save('./reports/EVM-Report.docx')
    print("success")
    sys.stdout.flush()
