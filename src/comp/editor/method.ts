import { abcRender } from '$comp/markdown/abcRender';
import * as adapterRender from '$comp/markdown/adapterRender';
import { chartRender } from '$comp/markdown/chartRender';
import { codeRender } from '$comp/markdown/codeRender';
import { flowchartRender } from '$comp/markdown/flowchartRender';
import { graphvizRender } from '$comp/markdown/graphvizRender';
import { highlightRender } from '$comp/markdown/highlightRender';
import { lazyLoadImageRender } from '$comp/markdown/lazyLoadImageRender';
import { mathRender } from '$comp/markdown/mathRender';
import { mediaRender } from '$comp/markdown/mediaRender';
import { mermaidRender } from '$comp/markdown/mermaidRender';
import { markmapRender } from '$comp/markdown/markmapRender';
import { mindmapRender } from '$comp/markdown/mindmapRender';
import { outlineRender } from '$comp/markdown/outlineRender';
import { plantumlRender } from '$comp/markdown/plantumlRender';
import { md2html, previewRender } from '$comp/markdown/previewRender';
import { previewImage } from '$comp/preview/image';
import { setCodeTheme } from '$comp/ui/setCodeTheme';
import { setContentTheme } from '$comp/ui/setContentTheme';

class Vditor {
	/** 点击图片放大 */
	public static adapterRender = adapterRender;
	/** 点击图片放大 */
	public static previewImage = previewImage;
	/** 为 element 中的代码块添加复制按钮 */
	public static codeRender = codeRender;
	/** 对 graphviz 进行渲染 */
	public static graphvizRender = graphvizRender;
	/** 为 element 中的代码块进行高亮渲染 */
	public static highlightRender = highlightRender;
	/** 对数学公式进行渲染 */
	public static mathRender = mathRender;
	/** 流程图/时序图/甘特图渲染 */
	public static mermaidRender = mermaidRender;
	/** 支持markdown的思维导图 */
	public static markmapRender = markmapRender;
	/** flowchart.js 渲染 */
	public static flowchartRender = flowchartRender;
	/** 图表渲染 */
	public static chartRender = chartRender;
	/** 五线谱渲染 */
	public static abcRender = abcRender;
	/** 脑图渲染 */
	public static mindmapRender = mindmapRender;
	/** plantuml渲染 */
	public static plantumlRender = plantumlRender;
	/** 大纲渲染 */
	public static outlineRender = outlineRender;
	/** 为[特定链接](https://github.com/Vanessa219/vditor/issues/7)分别渲染为视频、音频、嵌入的 iframe */
	public static mediaRender = mediaRender;
	/** 对图片进行懒加载 */
	public static lazyLoadImageRender = lazyLoadImageRender;
	/** Markdown 文本转换为 HTML，该方法需使用[异步编程](https://ld246.com/article/1546828434083?r=Vaness) */
	public static md2html = md2html;
	/** 页面 Markdown 文章渲染 */
	public static preview = previewRender;
	/** 设置代码主题 */
	public static setCodeTheme = setCodeTheme;
	/** 设置内容主题 */
	public static setContentTheme = setContentTheme;
}

export default Vditor;
